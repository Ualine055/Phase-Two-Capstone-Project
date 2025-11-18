// FIREBASE BACKEND - Using Firestore
// Install: npm install firebase-admin
// Download service account JSON from Firebase Console
// Environment: FIREBASE_SERVICE_ACCOUNT='{...json...}'

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
initializeApp({ credential: cert(serviceAccount) });
export const db = getFirestore();

// =================== USERS QUERIES ===================
export async function getUserById(id: string) {
  const doc = await db.collection('users').doc(id).get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

export async function getUserByUsername(username: string) {
  const query = await db.collection('users').where('username', '==', username).limit(1).get();
  if (query.empty) return null;
  const doc = query.docs[0];
  return { id: doc.id, ...doc.data() };
}

export async function createUser(username: string, email: string, passwordHash: string) {
  const docRef = await db.collection('users').add({
    username,
    email,
    passwordHash,
    bio: '',
    avatarUrl: '',
    followersCount: 0,
    followingCount: 0,
    createdAt: Timestamp.now()
  });
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

// =================== POSTS QUERIES ===================
export async function getPosts(page: number = 1, limit: number = 10) {
  const offset = (page - 1) * limit;
  const query = db.collection('posts').where('status', '==', 'published').orderBy('createdAt', 'desc');
  
  const totalQuery = await query.get();
  const total = totalQuery.size;
  
  const snapshot = await query.offset(offset).limit(limit).get();
  const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
}

export async function getPostById(id: string) {
  const doc = await db.collection('posts').doc(id).get();
  if (!doc.exists) return null;
  const data = doc.data();
  if (data?.status !== 'published') return null;
  return { id: doc.id, ...data };
}

export async function createPost(userId: string, title: string, excerpt: string, content: string, tags: string[]) {
  const docRef = await db.collection('posts').add({
    userId,
    title,
    excerpt,
    content,
    tags,
    status: 'draft',
    viewsCount: 0,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

export async function updatePost(id: string, title: string, excerpt: string, content: string, status: string) {
  await db.collection('posts').doc(id).update({
    title,
    excerpt,
    content,
    status,
    updatedAt: Timestamp.now()
  });
  const doc = await db.collection('posts').doc(id).get();
  return { id: doc.id, ...doc.data() };
}

export async function deletePost(id: string) {
  await db.collection('posts').doc(id).delete();
  return { success: true };
}

// =================== COMMENTS QUERIES ===================
export async function getComments(postId: string) {
  const snapshot = await db.collection('comments').where('postId', '==', postId).orderBy('createdAt', 'desc').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function createComment(postId: string, userId: string, content: string, parentCommentId?: string) {
  const docRef = await db.collection('comments').add({
    postId,
    userId,
    content,
    parentCommentId: parentCommentId || null,
    createdAt: Timestamp.now()
  });
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

// =================== REACTIONS QUERIES ===================
export async function addReaction(postId: string, userId: string, reactionType: string = 'like') {
  const reactionId = `${postId}_${userId}`;
  await db.collection('reactions').doc(reactionId).set({
    postId,
    userId,
    reactionType,
    createdAt: Timestamp.now()
  }, { merge: true });
  return { success: true, reactionId };
}

export async function removeReaction(postId: string, userId: string) {
  const reactionId = `${postId}_${userId}`;
  await db.collection('reactions').doc(reactionId).delete();
  return { success: true };
}

export async function getPostReactions(postId: string) {
  const snapshot = await db.collection('reactions').where('postId', '==', postId).get();
  const reactions: Record<string, number> = {};
  
  snapshot.forEach(doc => {
    const type = doc.data().reactionType;
    reactions[type] = (reactions[type] || 0) + 1;
  });
  
  return reactions;
}

// =================== FOLLOW QUERIES ===================
export async function followUser(followerId: string, followingId: string) {
  const followId = `${followerId}_${followingId}`;
  await db.collection('follows').doc(followId).set({
    followerId,
    followingId,
    createdAt: Timestamp.now()
  });
  return { success: true };
}

export async function unfollowUser(followerId: string, followingId: string) {
  const followId = `${followerId}_${followingId}`;
  await db.collection('follows').doc(followId).delete();
  return { success: true };
}

export async function getFollowers(userId: string) {
  const snapshot = await db.collection('follows').where('followingId', '==', userId).get();
  const followerIds = snapshot.docs.map(doc => doc.data().followerId);
  
  const users = await Promise.all(
    followerIds.map(id => getUserById(id))
  );
  
  return users.filter(u => u !== null);
}
