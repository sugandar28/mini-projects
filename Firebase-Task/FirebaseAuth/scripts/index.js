const guidelist = document.querySelector(".guides");

const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const accountDetails = document.querySelector(".account-details");

const adminItem = document.querySelectorAll(".admin");

const setupUI = (user) => {
  if (user) {
    //show admin
    if (user.admin) {
      adminItem.forEach((item) => (item.style.display = "block"));
    }
    // account info
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `<div> Loged in as ${user.email}</div>
        <div>${doc.data().bio}</div>
        <div class="pink-text">${user.admin ? "Admin" : ""}</div>`;
        accountDetails.innerHTML = html;
      });

    //toggel ui element
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
  } else {
    //hide eadmin
    adminItem.forEach((item) => (item.style.display = "none"));
    // hide acc details
    accountDetails.innerHTML;
    //toggel ui element
    loggedInLinks.forEach((item) => (item.style.display = "none"));
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
  }
};
//setup guides
const setupGuides = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const guide = doc.data();

      const li = `
    <li>
        <div class="collapsible-header grey lighten-4">${guide.Title}</div>
        <div class="collapsible-body white">${guide.Content}</div>
      </li>
    `;
      html += li;
    });
    guidelist.innerHTML = html;
  } else {
    guidelist.innerHTML = `<h5 class="center-align">Login To View Guides</h5>`;
  }
};

//set up materaliz component
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
