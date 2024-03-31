let updated_id = -1;

async function handleBookappointment(event) {
  event.preventDefault();
  if (updated_id != -1) {
    handleupdate(event);
    return;
  } else {
    console.log("bye");
    const formData = {
      username: event.target.username.value,
      email: event.target.emailid.value,
      phone: event.target.phone.value,
    };
    const data = await axios.post(
      "http://localhost:8000/api/booking/",
      formData
    );
    console.log(data);
    getallbookings();
  }
}

async function getallbookings() {
  const data = await axios.get("http://localhost:8000/api/booking/");
  const finaldata = data.data;
  console.log(finaldata);

  const basebox = document.getElementById("main_app_result");
  basebox.innerHTML = "";
  for (let i = 0; i < finaldata.length; i++) {
    const eventBox = document.createElement("div");
    eventBox.className = "details_box";
    const p1 = document.createElement("p");
    p1.textContent = `${finaldata[i].username}`;
    const p2 = document.createElement("p");
    p2.textContent = `${finaldata[i].email}`;
    const p3 = document.createElement("p");
    p3.textContent = `${finaldata[i].phone}`;
    const b1 = document.createElement("button");
    b1.textContent = "Edit";
    b1.addEventListener("click", async () => {
      const username_input = document.getElementById("username");
      username_input.value = finaldata[i].username;
      const email_input = document.getElementById("emailid");
      email_input.value = finaldata[i].email;
      const phone_input = document.getElementById("phone");
      phone_input.value = finaldata[i].phone;
      const button_input = document.getElementById("formsubmit");
      button_input.style.display = "none";
      const button_input1 = document.getElementById("formsubmitupdate");
      button_input1.style.display = "block";
      updated_id = finaldata[i].id;
    });
    const b2 = document.createElement("button");
    b2.textContent = "Delete";
    b2.addEventListener("click", async () => {
      const data = await axios.delete(
        `http://localhost:8000/api/booking/${finaldata[i].id}`
      );
      console.log(data);
      getallbookings();
    });
    basebox.appendChild(eventBox);
    eventBox.appendChild(p1);
    eventBox.appendChild(p2);
    eventBox.appendChild(p3);
    eventBox.appendChild(b1);
    eventBox.appendChild(b2);
  }
}

async function handleupdate(event) {
  event.preventDefault();
  console.log("hello");
  const formData = {
    username: event.target.username.value,
    email: event.target.emailid.value,
    phone: event.target.phone.value,
  };
  const data = await axios.put(
    `http://localhost:8000/api/booking/${updated_id}`,
    formData
  );
  console.log(data);
  updated_id = -1;
  getallbookings();
}

getallbookings();
