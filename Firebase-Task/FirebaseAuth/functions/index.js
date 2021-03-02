const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // check request is made by an admin
  if (context.auth.admin !== true) {
    return { error: "only admin can make other admins " };
  }

  //get the user and  Add custome claim(admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `Sucess! ${data.email} has been made admin`,
      };
    })
    .catch((err) => {
      return err;
    });
});
