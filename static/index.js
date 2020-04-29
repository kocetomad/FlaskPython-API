var PATH = "http://" + document.location.host;
console.log(PATH);
loadPage(0);

var currentPage = 0;
var currentuser = -1;

function loadPage(page) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      res = JSON.parse(this.response.replace(/'/g, '"'));
      usersTable = document.getElementById("tblUsers");
      totalPages.innerHTML = res[0].pages;
      res.shift();
      for (i in res) {
        row = document.createElement("tr");
        cell = document.createElement("td");
        cell.innerHTML = res[i].User_ID;
        if (i == res.length - 1) {
          cell.style.cssText = "border-radius: 0px 0px 0px 25px ;";
        }
        row.appendChild(cell);
        cell = document.createElement("td");
        cell.innerHTML = res[i].Email;
        row.appendChild(cell);
        cell = document.createElement("td");
        cell.innerHTML = res[i].First_Name;
        row.appendChild(cell);
        cell = document.createElement("td");
        cell.innerHTML = res[i].Last_Name;
        row.appendChild(cell);
        cell = document.createElement("td");
        img = document.createElement("img");
        img.width = 128;
        img.width = 128;
        img.src = res[i].Avatar;
        cell.appendChild(img);
        if (i == res.length - 1) {
          cell.style.cssText = "border-radius: 0px 0px 25px 0px ;";
        }
        row.appendChild(cell);

        usersTable.appendChild(row);
        console.log(res[i]);
        o = Number(i) + 1;
        row.id = "user" + o;
        row.addEventListener("click", function () {
          editBox(this.id);
        });
      }
    }
  };
  xhttp.open("GET", PATH + "/getListUsers/page/" + page, true);
  xhttp.send();
}

function editBox(elem) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      res = JSON.parse(this.response.replace(/'/g, '"'));
      console.log(res);

      idInput = document.getElementById("userID");
      idInput.value = res.User_ID;
      emailInput = document.getElementById("userEmail");
      emailInput.value = res.Email;
      firstnInput = document.getElementById("userFirstName");
      firstnInput.value = res.First_Name;
      lastInput = document.getElementById("userLastName");
      lastInput.value = res.Last_Name;
      Avatar = document.getElementById("Avatar");
      Avatar.value = res.Avatar;
      img = document.getElementById("userAvatar");
      img.src = res.Avatar;
    }
  };

  currentuser = elem.slice(-1) - 1;
  xhttp.open(
    "GET",
    PATH + "/getSingleUser/page/" + currentPage + "/user/" + currentuser + "",
    true
  );
  xhttp.send();
}

function deleteUser() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      refresh();
      loadPage(currentPage--);
      currentuser = -1;
    }
  };
  if (currentuser >= 0) {
    xhttp.open("DELETE", PATH + "/deleteUser", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        page: Number(currentPage),
        user: currentuser,
      })
    );
  }
}

function refresh() {
  const parser = new DOMParser();
  var usrTable = document.getElementById("tblUsers");
  usrTable.innerHTML = "";
  var firstRow = `
  <tbody><tr  id="tblUserHeader">
                            <th style=" border-radius: 25px 0px 0px 0px;">User ID</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th style=" border-radius:  0px 25px 0px 0px;">Avatar</th>
                        </tr>`;
  usrTable.innerHTML = firstRow;
}

function newUser() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      refresh();
      loadPage(currentPage);
      currentuser = -1;
    }
  };

  NEWuserID = document.getElementById("NEWuserID");
  NEWuserEmail = document.getElementById("NEWuserEmail");
  NEWuserFirstName = document.getElementById("NEWuserFirstName");
  NEWuserLastName = document.getElementById("NEWuserLastName");
  NewAvatar = document.getElementById("NewAvatar");

  xhttp.open("POST", PATH + "/createUser", true);
  xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      User_ID: NEWuserID.value,
      Email: NEWuserEmail.value,
      First_Name: NEWuserFirstName.value,
      Last_Name: NEWuserLastName.value,
      Avatar: NewAvatar.value,
    })
  );
}

function editUser() {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      refresh();
      loadPage(currentPage);
      currentuser = -1;
    }
  };

  idInput = document.getElementById("userID");
  emailInput = document.getElementById("userEmail");
  firstnInput = document.getElementById("userFirstName");
  lastInput = document.getElementById("userLastName");
  avatar = document.getElementById("Avatar");

  if (currentuser >= 0) {
    xhttp.open("PUT", PATH + "/updateUser", true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        page: Number(currentPage),
        user: currentuser,
        User_ID: idInput.value,
        Email: emailInput.value,
        First_Name: firstnInput.value,
        Last_Name: lastInput.value,
        Avatar: avatar.value,
      })
    );
  }
}

function pageUp() {
  if (Number(document.getElementById("pageNumber").innerHTML) < Number(document.getElementById("totalPages").innerHTML)) {
    refresh();
    currentPage++;
    loadPage(currentPage);
    page = document.getElementById("pageNumber");
    page.innerHTML = Number(currentPage + 1);
  }
}

function pageDown() {
  if (currentPage + 1 > 1) {
    refresh();
    currentPage--;
    loadPage(currentPage);
    page = document.getElementById("pageNumber");
    page.innerHTML = Number(currentPage + 1);
  }
}

function setImg() {
  img = document.getElementById("userAvatar");
  avatarForm = document.getElementById("Avatar");
  img.src = avatarForm.value;
}

function setImgNewUser() {
  img = document.getElementById("NEWuserAvatar");
  avatarForm = document.getElementById("NewAvatar");
  img.src = avatarForm.value;
}
