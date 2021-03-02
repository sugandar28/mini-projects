const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp();

//Auth Trigger (new user Signup)

exports.newUserSignup = functions.auth.user().onCreate((user) => {
  // for background triggers you must return a value/promise
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    upvotedOn: [],
  });
});

//Auth Trigger ( user Deleted)
exports.userDeleted = functions.auth.user().onDelete((user) => {
  const doc = admin.firestore().collection("users").doc(user.uid);
  return doc.delete();
});

//http callabel function (adding a request)

exports.addRequest = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "only Authenticated user can add request"
    );
  }
  if (data.text.length > 30) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Request must be not more than 30"
    );
  }
  return admin
    .firestore()
    .collection("requests")
    .add({ text: data.text, upvote: 0 });
});

//upvote callabel functions

exports.upvote = functions.https.onCall(async (data, context) => {
  // check auth state
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "only authenticated users can vote up requests"
    );
  }
  // get refs for user doc & request doc
  const user = admin.firestore().collection("users").doc(context.auth.uid);
  const request = admin.firestore().collection("requests").doc(data.id);

  const doc = await user.get();
  // check thew user hasn't already upvoted
  if (doc.data().upvotedOn.includes(data.id)) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "You can only vote something up once"
    );
  }

  // update the array in user document
  await user.update({
    upvotedOn: [...doc.data().upvotedOn, data.id],
  });

  // update the votes on the request
  return request.update({
    upvote: admin.firestore.FieldValue.increment(1),
  });
});

// firestore activity

// firestore trigger for tracking activity
exports.logActivities = functions.firestore
  .document("/{collection}/{id}")
  .onCreate((snap, context) => {
    console.log(snap.data());

    const activities = admin.firestore().collection("activities");
    const collection = context.params.collection;

    if (collection === "requests") {
      return activities.add({ text: "a new tutorial request was added" });
    }
    if (collection === "users") {
      return activities.add({ text: "a new user signed up" });
    }
    return null;
  });
