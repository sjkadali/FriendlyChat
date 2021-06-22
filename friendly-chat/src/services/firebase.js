import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();
    console.log("result: "+ result.docs);
    return result.docs.length > 0;
}

export async function getUserByUsername(username) {
  const result = await firebase
      .firestore()
      .collection('users')
      .where('username', '==', username)
      .get();
  
  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('userId', '==', userId)
        .get();
    const user = result.docs.map((item) => ({
        ...item.data(), 
        docId: item.id
    }));

    return user;
}

export async function getSuggestedProfiles(userId, following) {
    let query = firebase.firestore().collection('users');
  
    if (following.length > 0) {
      query = query.where('userId', 'not-in', [...following, userId]);
    } else {
      query = query.where('userId', '!=', userId);
    }
    const result = await query.limit(10).get();
  
    const profiles = result.docs.map((user) => ({
      ...user.data(),
      docId: user.id
    }));
  
    return profiles;
  }
  
  export async function updateLoggedInUserFollowing(
    loggedInUserDocId,
    profileId,
    isFollowingProfile
  ) {
    return firebase.firestore().collection('users').doc(loggedInUserDocId).update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId)
    });
  }

  export async function updateFollowedUserFollowers(
    profileDocId,
    loggedInUserDocId,
    isFollowingProfile
  ) {
    return firebase.firestore().collection('users').doc(profileDocId).update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId)
    });
  }

  export async function getPhotos(userId, following) {
    const result = await firebase
      .firestore()
      .collection('photos')
      .where('userId', 'in', following)
      .get();

    const userFollowedPhotos = result.docs.map((photo) => ({
      ...photo.data(),
      docId: photo.id
    }));
  
    const photosWithUserDetails = await Promise.all(
      userFollowedPhotos.map(async (photo) => {
        let userLikedPhoto = false;
        if (photo.likes.includes(userId)) {
          userLikedPhoto = true;
        }
        const user = await getUserByUserId(photo.userId);
        const { username } = user[0];
        return { username, ...photo, userLikedPhoto };
      })
    );

    return photosWithUserDetails;
  }

  export async function getUserPhotosByUsername(username) {
    const [user] = await getUserByUsername(username);
    const result = await firebase
      .firestore()
      .collection('photos')
      .where('userId', '==', user.userId)
      .get();
      const photos = result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
      }));
      return photos;
  }

  export async function getUserPhotosByUserId(userId) {
    const result = await firebase
      .firestore()
      .collection('photos')
      .where('userId', '==', userId)
      .get();
  
    const photos = result.docs.map((photo) => ({
      ...photo.data(),
      docId: photo.id
    }));
    return photos;
  }
  
  export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
    const result = await firebase
      .firestore()
      .collection('users')
      .where('username', '==', loggedInUserUsername)
      .where('following', 'array-contains', profileUserId)
      .get();
  
    const [response = {}] = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id
    }));
  
    return response.userId;
  }
  
  export async function toggleFollow(
    isFollowingProfile,
    activeUserDocId,
    profileDocId,
    profileUserId,
    followingUserId
  ) {
    
    await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
     
    await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
  }

  // Saves a new message on the Cloud Firestore.
export async function postMessage(messageText, userId) {
  // Add a new message entry to the Firebase database.
  const result = await  firebase
    .firestore()
    .collection('photos')
    .add({
      photoId: userId,
      userId: userId,
      imageSrc: '',
      caption: messageText,
      likes: [],
      comments: [],
      userLatitude: '40.7128°',
      userLongitude: '74.0060°',
      dateCreated: Date.now()
    }).catch(function(error) {
      console.error('Error writing new message to Firebase Database', error);
    });
  return result;
}

/* 
  // Saves a new message containing an image in Firebase.
  // This first saves the image in Firebase storage.
  export async function postImage(file) {
    // 1 - We add a message with a loading icon that will get updated with the shared image.
    firebase.firestore().collection('photos').add({
      name: getUserName(),
      imageUrl: LOADING_IMAGE_URL,
      profilePicUrl: getProfilePicUrl(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function(messageRef) {
      // 2 - Upload the image to Cloud Storage.
      var filePath = firebase.auth().currentUser.uid + '/' + messageRef.id + '/' + file.name;
      return firebase.storage().ref(filePath).put(file).then(function(fileSnapshot) {
        // 3 - Generate a public URL for the file.
        return fileSnapshot.ref.getDownloadURL().then((url) => {
          // 4 - Update the chat message placeholder with the image's URL.
          return messageRef.update({
            imageUrl: url,
            storageUri: fileSnapshot.metadata.fullPath
          });
        });
      });
    }).catch(function(error) {
      console.error('There was an error uploading a file to Cloud Storage:', error);
    });
  } */