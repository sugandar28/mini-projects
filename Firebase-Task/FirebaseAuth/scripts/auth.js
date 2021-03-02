//add admin cloud function
const adminForm = document.querySelector(".admin-actions");
adminForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const adminEmail = document.querySelector("#admin-email").value;
  const addAdminRole = functions.httpsCallable("addAdminRole");
  addAdminRole({ email: adminEmail }).then((res) => {
    console.log(res);
  });
});
// Listen for auth user
auth.onAuthStateChanged((user) => {
  if (user) {
    // Get  data
    user.getIdTokenResult().then((idTokenResult) => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });
    db.collection("Guides").onSnapshot(
      (snapshot) => {
        setupGuides(snapshot.docs);
      },
      (err) => {
        console.log(err.message);
      }
    );
  }
  setupUI();
  setupGuides([]);
});
// create new guide

const createForm = document.querySelector("#create-form");

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("Guides")
    .add({
      Title: createForm["title"].value,
      Content: createForm["content"].value,
    })
    .then(() => {
      //close modal and reset form
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});
// sing up form
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user info

  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  //sign up value
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        bio: signupForm["signup-bio"].value,
      });
      // console.log(cred.user);
    })
    .then(() => {
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
      signupForm.querySelector(".error").innerHTML = "";
    })
    .catch((err) => {
      signupForm.querySelector(".error").innerHTML = err.message;
    });
});
// Log out
const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    //console.log("User Signed Out");
  });
});

//Login form

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  // Login user

  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    //console.log(cred.user);
    //close the modal and rest the form
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
