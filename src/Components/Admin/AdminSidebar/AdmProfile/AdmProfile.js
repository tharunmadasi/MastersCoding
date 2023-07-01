import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdModeEditOutline } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import axios from "axios";

function AdmProfile() {
  let [editName, setEditName] = useState(false);
  let [editEmail, setEditEmail] = useState(false);
  let [editMobile, setEditMobile] = useState(false);
  let [isUpdated, setIsUpdated] = useState(false);
  let [editLinkedin, setEditLinkedin] = useState(false);
  let [editGithub, setEditGithub] = useState(false);
  //adminDetails
  let [admName, setadmName] = useState("");
  let [admRoll, setadmRoll] = useState("");
  let [admEmail, setadmEmail] = useState("");
  let [admMobile, setadmMobile] = useState("");
  let [admLinkedin, setadmLinkedin] = useState("");
  let [admGithub, setadmGithub] = useState("");

  //forms
  const nameForm = useForm();
  const emailForm = useForm();
  const mobileForm = useForm();
  const linkedinForm = useForm();
  const githubForm = useForm();

  //handle name edit
  const handleName = (data) => {
    data.roll = admRoll.toLowerCase();
    data.field = "name";
    console.log(data);
    axios
      .post("http://localhost:3500/admin/updateprofile", data)
      .then((res) => {
        setIsUpdated(!isUpdated);
        console.log("response in admin profile~ ", res);
      })
      .catch((err) => {
        console.log("error in profile~ ", err);
      });
    setEditName(!editName);
  };
  //handle email edit
  const handleEmail = (data) => {
    data.roll = admRoll.toLowerCase();
    data.field = "mail";
    console.log(data);
    axios
      .post("http://localhost:3500/admin/updateprofile", data)
      .then((res) => {
        setIsUpdated(!isUpdated);
        console.log("response in admin profile~ ", res);
      })
      .catch((err) => {
        console.log("error in profile~ ", err);
      });
    setEditEmail(false);
  };
  //handle mobile edit
  const handleMobile = (data) => {
    data.roll = admRoll.toLowerCase();
    data.field = "mobile";
    console.log(data);
    axios
      .post("http://localhost:3500/admin/updateprofile", data)
      .then((res) => {
        setIsUpdated(!isUpdated);
        console.log("response in admin profile~ ", res);
      })
      .catch((err) => {
        console.log("error in profile~ ", err);
      });
    setEditMobile(false);
  };
  //handle linkedin edit
  const handleLinkedin = (data) => {
    data.roll = admRoll.toLowerCase();
    data.field = "linkedin";
    console.log(data);
    axios
      .post("http://localhost:3500/admin/updateprofile", data)
      .then((res) => {
        setIsUpdated(!isUpdated);
        console.log("response in admin profile~ ", res);
      })
      .catch((err) => {
        console.log("error in profile~ ", err);
      });
    setEditLinkedin(false);
  };

  //handle github edit
  const handleGithub = (data) => {
    data.roll = admRoll.toLowerCase();
    data.field = "github";
    console.log(data);
    axios
      .post("http://localhost:3500/admin/updateprofile", data)
      .then((res) => {
        setIsUpdated(!isUpdated);
        console.log("response in admin profile~ ", res);
      })
      .catch((err) => {
        console.log("error in profile~ ", err);
      });
    setEditGithub(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:3500/verifyLoginToken", { token })
        .then((res) => {
          setadmName(res.data.payload.name);
          setadmRoll(res.data.payload.roll);
          setadmEmail(res.data.payload.mail);
          setadmMobile(res.data.payload.mobile);
          setadmLinkedin(res.data.payload.linkedin);
          setadmGithub(res.data.payload.github);
          // console.log('response in profile ~',res)
        })
        .catch((err) => {
          console.log("error in profile ~", err);
        });
    }
  }, [isUpdated]);

  return (
    <div className="  container">
      <div className="row  mt-5 ">
        {/* Personal Details */}
        <div className="col-lg-6 mt-0 m-auto p-0 m-0">
          <h3 className="text-start mb-5">Personal Details</h3>
          <div className="row  p-0 m-0">
            {/* admin Name */}
            <div className="col-sm-4 text-start p-0 py-1 m-0  ">
              <label htmlFor="name" className="fw-bold">
                admin Name
              </label>
            </div>

            <form
              className="row col-sm-8"
              onSubmit={nameForm.handleSubmit(handleName)}
            >
              <div className="col-sm-9 text-start p-0 py-1  m-0">
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={admName}
                  disabled={!editName}
                  className="border fw-bold text-dark rounded"
                  {...nameForm.register("name", { required: true })}
                />
              </div>
              <div className="col-sm-3  p-0 m-0 text-start ">
                {editName ? (
                  <button type="submit" className="btn text-secondary">
                    <IoIosSend size={"25px"} className="text-success" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditName(true);
                    }}
                    className="btn text-secondary"
                  >
                    <MdModeEditOutline size={"25px"} className="text-warning" />
                  </button>
                )}
              </div>
            </form>
            {nameForm.formState.errors.name?.type === "required" && (
              <p className="text-danger">*This field shouldn't be empty</p>
            )}
            <hr className="m-1 p-0" />

            {/* admin Roll */}
            <div className="col-sm-4 text-start p-0 py-1 m-0  ">
              <label htmlFor="adminRoll" className="fw-bold">
                admin Roll
              </label>
            </div>
            <div className="col-sm-6  text-start p-0 py-1  m-0  ">
              <input
                type="text"
                name="adminRoll"
                id="adminRoll"
                value={admRoll}
                disabled
                className="border  fw-bold  text-dark rounded"
              />
            </div>
            <hr className="m-1 p-0" />

            {/* Email */}
            <div className="col-sm-4 text-start p-0 py-1 m-0  ">
              <label htmlFor="mail" className="fw-bold">
                Email
              </label>
            </div>
            <form
              className="row col-sm-8"
              onSubmit={emailForm.handleSubmit(handleEmail)}
            >
              <div className="col-sm-9  text-start p-0 py-1  m-0  ">
                <input
                  type="email"
                  name="mail"
                  id="mail"
                  defaultValue={admEmail}
                  disabled={!editEmail}
                  className="border  fw-bold  text-dark rounded"
                  {...emailForm.register("mail", { required: true })}
                />
              </div>
              <div className="col-sm-3 p-0 m-0 text-start ">
                {editEmail ? (
                  <button type="submit" className="btn text-secondary">
                    <IoIosSend size={"25px"} className="text-success" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditEmail(true);
                    }}
                    className="btn text-secondary"
                  >
                    <MdModeEditOutline size={"25px"} className="text-warning" />
                  </button>
                )}
              </div>
            </form>
            {emailForm.formState.errors.mail?.type === "required" && (
              <p className="text-danger">This field shouldn't be empty</p>
            )}
            <hr className="m-1 p-0" />

            {/* Mobile */}
            <div className="col-sm-4 text-start p-0 py-1 m-0  ">
              <label htmlFor="mobile" className="fw-bold">
                Mobile
              </label>
            </div>
            <form
              className="row col-sm-8"
              onSubmit={mobileForm.handleSubmit(handleMobile)}
            >
              <div className="col-sm-9  text-start p-0 py-1  m-0  ">
                <input
                  type="number"
                  name="mobile"
                  id="mobile"
                  defaultValue={admMobile}
                  disabled={!editMobile}
                  className="border  fw-bold  text-dark rounded"
                  {...mobileForm.register("mobile", {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                  })}
                />
              </div>
              <div className="col-sm-3 p-0 m-0 text-start ">
                {editMobile ? (
                  <button type="submit" className="btn text-secondary">
                    <IoIosSend size={"25px"} className="text-success" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditMobile(true);
                    }}
                    className="btn text-secondary"
                  >
                    <MdModeEditOutline size={"25px"} className="text-warning" />
                  </button>
                )}
              </div>
            </form>
            {mobileForm.formState.errors.mobile?.type === "required" && (
              <p className="text-danger">*This field shouldn't empty</p>
            )}
            {mobileForm.formState.errors.mobile?.type === "minLength" && (
              <p className="text-danger">*This field should have length 10</p>
            )}
            {mobileForm.formState.errors.mobile?.type === "maxLength" && (
              <p className="text-danger">*This field should have length 10</p>
            )}
            <hr className="m-1 p-0" />

            {/* LinkedIn */}
            <div className="col-sm-4 text-start p-0 py-1 m-0  ">
              <label htmlFor="linkedin" className="fw-bold">
                LinkedIn
              </label>
            </div>

            <form
              className="row col-sm-8"
              onSubmit={nameForm.handleSubmit(handleLinkedin)}
            >
              <div className="col-sm-9 text-start p-0 py-1  m-0">
                <input
                  type="url"
                  name="linkedin"
                  id="linkedin"
                  defaultValue={admLinkedin}
                  disabled={!editLinkedin}
                  className="border fw-bold text-dark rounded"
                  {...linkedinForm.register("linkedin", { required: true })}
                />
              </div>
              <div className="col-sm-3  p-0 m-0 text-start ">
                {editLinkedin ? (
                  <button type="submit" className="btn text-secondary">
                    <IoIosSend size={"25px"} className="text-success" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditLinkedin(true);
                    }}
                    className="btn text-secondary"
                  >
                    <MdModeEditOutline size={"25px"} className="text-warning" />
                  </button>
                )}
              </div>
            </form>
            {linkedinForm.formState.errors.linkedin?.type === "required" && (
              <p className="text-danger">*This field shouldn't be empty</p>
            )}
            <hr className="m-1 p-0" />

            {/* Git-hub */}
            <div className="col-sm-4 text-start p-0 py-1 m-0  ">
              <label htmlFor="github" className="fw-bold">
                Git-hub
              </label>
            </div>

            <form
              className="row col-sm-8"
              onSubmit={githubForm.handleSubmit(handleGithub)}
            >
              <div className="col-sm-9 text-start p-0 py-1  m-0">
                <input
                  type="url"
                  name="github"
                  id="github"
                  defaultValue={admGithub}
                  disabled={!editGithub}
                  className="border fw-bold text-dark rounded"
                  {...githubForm.register("name", { required: true })}
                />
              </div>
              <div className="col-sm-3  p-0 m-0 text-start ">
                {editGithub ? (
                  <button type="submit" className="btn text-secondary">
                    <IoIosSend size={"25px"} className="text-success" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditGithub(true);
                    }}
                    className="btn text-secondary"
                  >
                    <MdModeEditOutline size={"25px"} className="text-warning" />
                  </button>
                )}
              </div>
            </form>
            {nameForm.formState.errors.name?.type === "required" && (
              <p className="text-danger">*This field shouldn't be empty</p>
            )}
            <hr className="m-1 p-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdmProfile;
