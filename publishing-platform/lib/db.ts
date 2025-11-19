// FIREBASE BACKEND - Using Firestore
// Install: npm install firebase
// Environment variables configured in .env.local

import { db } from './firebase';
import { collection, doc, getDoc, query, where, limit, getDocs, addDoc, updateDoc, deleteDoc, Timestamp, orderBy, setDoc } from 'firebase/firestore';

// =================== USERS QUERIES ===================
export async function getUserById(id: string) {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

export async function getUserByUsername(username: string) {
  const q = query(collection(db, 'users'), where('username', '==', username), limit(1));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;
  const docSnap = querySnapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() };
}

export async function createUser(username: string, email: string, passwordHash: string) {
  const docRef = await addDoc(collection(db, 'users'), {
    username,
    email,
    passwordHash,
    bio: '',
    avatarUrl: '',
    followersCount: 0,
    followingCount: 0,
    createdAt: Timestamp.now()
  });
  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() };
}

// =================== POSTS QUERIES ===================
export async function getPosts(page: number = 1, limitCount: number = 10) {
  try {
    console.log('[DB] Getting posts with page:', page, 'limit:', limitCount);
    
    // First, try to get all posts to see what's in the database
    const allPostsQuery = query(collection(db, 'posts'));
    const allPostsSnapshot = await getDocs(allPostsQuery);
    console.log('[DB] Total posts in database:', allPostsSnapshot.size);
    
    allPostsSnapshot.docs.forEach(doc => {
      console.log('[DB] Post:', doc.id, doc.data());
    });
    
    // Now get published posts
    const q = query(collection(db, 'posts'), where('status', '==', 'published'), orderBy('createdAt', 'desc'));
    const totalQuery = await getDocs(q);
    const total = totalQuery.size;
    console.log('[DB] Published posts found:', total);
    
    const limitedQuery = query(collection(db, 'posts'), where('status', '==', 'published'), orderBy('createdAt', 'desc'), limit(limitCount));
    const snapshot = await getDocs(limitedQuery);
    const posts = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    
    console.log('[DB] Returning posts:', posts.length);
    return {
      posts,
      pagination: {
        page,
        limit: limitCount,
        total,
        pages: Math.ceil(total / limitCount)
      }
    };
  } catch (error) {
    console.error('[DB] Error in getPosts:', error);
    throw error;
  }
}

export async function getPostById(id: string, includeDrafts: boolean = false) {
  const docRef = doc(db, 'posts', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  const data = docSnap.data();
  if (!includeDrafts && data?.status !== 'published') return null;
  return { id: docSnap.id, ...data };
}

export async function createPost(userId: string, title: string, excerpt: string, content: string, tags: string[], imageUrl?: string) {
  const docRef = await addDoc(collection(db, 'posts'), {
    userId,
    title,
    excerpt,
    content,
    tags,
    imageUrl: imageUrl || '',
    status: 'draft',
    viewsCount: 0,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() };
}

export async function updatePost(id: string, title: string, excerpt: string, content: string, status: string) {
  const docRef = doc(db, 'posts', id);
  await updateDoc(docRef, {
    title,
    excerpt,
    content,
    status,
    updatedAt: Timestamp.now()
  });
  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() };
}

export async function deletePost(id: string) {
  const docRef = doc(db, 'posts', id);
  await deleteDoc(docRef);
  return { success: true };
}

// =================== COMMENTS QUERIES ===================
export async function getComments(postId: string) {
  const q = query(collection(db, 'comments'), where('postId', '==', postId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
}

export async function createComment(postId: string, userId: string, content: string, parentCommentId?: string) {
  const docRef = await addDoc(collection(db, 'comments'), {
    postId,
    userId,
    content,
    parentCommentId: parentCommentId || null,
    createdAt: Timestamp.now()
  });
  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() };
}

// =================== REACTIONS QUERIES ===================
export async function addReaction(postId: string, userId: string, reactionType: string = 'like') {
  const reactionId = `${postId}_${userId}`;
  const docRef = doc(db, 'reactions', reactionId);
  await setDoc(docRef, {
    postId,
    userId,
    reactionType,
    createdAt: Timestamp.now()
  }, { merge: true });
  return { success: true, reactionId };
}

export async function removeReaction(postId: string, userId: string) {
  const reactionId = `${postId}_${userId}`;
  const docRef = doc(db, 'reactions', reactionId);
  await deleteDoc(docRef);
  return { success: true };
}

export async function getPostReactions(postId: string) {
  const q = query(collection(db, 'reactions'), where('postId', '==', postId));
  const snapshot = await getDocs(q);
  const reactions: Record<string, number> = {};
  
  snapshot.forEach(docSnap => {
    const type = docSnap.data().reactionType;
    reactions[type] = (reactions[type] || 0) + 1;
  });
  
  return reactions;
}

// =================== FOLLOW QUERIES ===================
export async function followUser(followerId: string, followingId: string) {
  const followId = `${followerId}_${followingId}`;
  const docRef = doc(db, 'follows', followId);
  await setDoc(docRef, {
    followerId,
    followingId,
    createdAt: Timestamp.now()
  });
  return { success: true };
}

export async function unfollowUser(followerId: string, followingId: string) {
  const followId = `${followerId}_${followingId}`;
  const docRef = doc(db, 'follows', followId);
  await deleteDoc(docRef);
  return { success: true };
}

export async function getFollowers(userId: string) {
  const q = query(collection(db, 'follows'), where('followingId', '==', userId));
  const snapshot = await getDocs(q);
  const followerIds = snapshot.docs.map(docSnap => docSnap.data().followerId);
  
  const users = await Promise.all(
    followerIds.map(id => getUserById(id))
  );
  
  return users.filter(u => u !== null);
}
