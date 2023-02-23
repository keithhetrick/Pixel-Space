import { useGetUsersQuery } from "../../features/users/usersApiSlice";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { preview } from "../../assets";
import { getRandomPrompt } from "../../utils";
import { FormField, Loader } from "../../components";
import ErrorMessage from "../../hooks/useErrorMessage";

const CreatePost = () => {
  const { data: users, isLoading, isSuccess } = useGetUsersQuery({});
  // console.log("users: ", users);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  // map through users to get user id's
  const userRef = users?.data?.map((user) => {
    return user._id;
  });

  // console.log("userRef: ", userRef);

  const [userRefId, setUserRefId] = useState(userRef);

  // map through users to get user names
  const userName = users?.data?.map((user) => {
    return user.name;
  });

  // console.log("userName: ", userName);

  // when name is selected, set userRefId to the id of the selected user
  const handleSelect = (e) => {
    const selectedUser = e.target.value;
    const selectedUserId = users?.data?.find(
      (user) => user.name === selectedUser
    );
    setUserRefId(selectedUserId._id);
    // console.log("selectedUserId: ", selectedUserId._id);

    // set the selected user name as the default value for the name field
    setForm({ ...form, name: selectedUser });
    // console.log("selectedUser: ", selectedUser);
  };

  // console.log("NAME: ", form.name);

  const navigate = useNavigate();
  const [
    loggedInUser,
    // eslint-disable-next-line
    setLoggedInUser,
  ] = useState(null);

  const [generatingImg, setGeneratingImg] = useState(false);
  // eslint-disable-next-line
  const [loggedIn, setLoggedIn] = useState(false);

  // change useHeaderButton title & link if not logged in
  useEffect(() => {
    const button = document.querySelector(".header__button");
    button.innerHTML = "Login";
    button.href = "/login";

    return () => {
      button.innerHTML = "";
      button.href = "";
    };
  }, []);

  // ERRORS VALIDATION
  const [errors, setErrors] = useState("");

  // HANDLERS
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  // const pushToUsersPosts = async () => {
  //   const response = await axios.post(
  //     `http://localhost:8000/api/users/${userRefId}/posts`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       posts: form,
  //     }
  //   );
  //   const data = await response.data;
  //   console.log("\nPUSH POST data: ", data);
  // };

  // URL'S
  const postUrl = "http://localhost:8000/api/dalle";
  const getUrl = "http://localhost:8000/api/post";

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await axios.post(postUrl, {
          headers: {
            "Content-Type": "application/json",
          },
          prompt: form.prompt,
        });

        const data = await response.data;
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        setErrors(err.response?.data?.message);
        console.error(err.response);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      setTimeout(() => {
        setErrors("");
      }, 10000);
      setErrors("Please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await axios.post(getUrl, {
          ...form,
          userRef: userRefId,
        });

        await response.data;

        console.log("\nPOST DATA response: ", response);

        // pushToUsersPosts();

        navigate("/");
      } catch (err) {
        setErrors(err.response?.data?.message);
        if (!form.name) setErrors("Please enter a name to post your image");
        console.log(err.response);

        if (!form.prompt) {
          setErrors("Please enter a prompt and generate an image");
        }
        setTimeout(() => {
          setErrors("");
        }, 10000);
      } finally {
        setLoading(false);
      }
    } else {
      setTimeout(() => {
        setErrors("");
      }, 10000);
      setErrors("Please enter a prompt and generate an image");
    }
  };

  const [randomPrompt, setRandomPrompt] = useState(
    getRandomPrompt(form.prompt)
  );

  useEffect(() => {
    setRandomPrompt(getRandomPrompt(form.prompt));
  }, [form.prompt]);

  // disable default html browser validation - allow for custom validation
  useEffect(() => {
    const forms = document.getElementsByTagName("form");
    for (let i = 0; i < forms.length; i++) {
      forms[i].setAttribute("novalidate", true);
    }
  }, []);

  return (
    <section className="h-full ">
      <div className="px-6 text-gray-800">
        {loading && (
          <div className="pb-6 flex justify-center items-center">
            <Loader />
          </div>
        )}
        <div className="flex flex-col w-full">
          <div>
            <h1 className="font-extrabold text-[#222328] text-4xl">Create</h1>
            <p className="mt-[1px] pt-3 text-[#666e75] text-sm max-w-[500px]">
              Generate an imaginative image through DALL-E AI and share it with
              the community
            </p>

            {loggedInUser && (
              <p className="mt-[1px] pt-3 text-[#666e75] text-sm max-w-[500px]">
                Logged in as {loggedInUser}
              </p>
            )}
          </div>

          {errors && (
            <div className="flex flex-col items-center -mb-[47px] mt-[1px] w-auto">
              <ErrorMessage
                variant={errors ? "danger" : "success"}
                message={errors}
              />
            </div>
          )}

          {isSuccess && (
            <form className="mt-12 max-w-3xl" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <select
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-3 h-12 flex justify-center items-center hover:border-gray-400 cursor-pointer transition duration-200"
                    onChange={handleSelect}
                    onClick={handleChange}
                  >
                    <option defaultValue={true} value="Select User">
                      Select User
                    </option>
                    {userName &&
                      userName.map((user) => {
                        return (
                          <option key={user} value={user}>
                            {user}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <FormField
                  labelName="Prompt"
                  type="text"
                  name="prompt"
                  placeholder={randomPrompt}
                  autoComplete="off"
                  value={form.prompt}
                  handleChange={handleChange}
                  isSurpriseMe
                  handleSurpriseMe={handleSurpriseMe}
                />

                <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center hover:border-gray-400 cursor-pointer transition duration-200">
                  {form.photo ? (
                    <img
                      src={form.photo}
                      alt={form.prompt}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={preview}
                      alt="pixel space"
                      className="w-9/12 h-9/12 object-contain opacity-40"
                    />
                  )}

                  {generatingImg && (
                    <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                      <Loader />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex">
                <button
                  className="px-7 py-3 bg-green-700 text-white font-medium text-xs leading-snug uppercase rounded-md shadow-md sm:w-auto hover:bg-green-800 hover:translate-y-[-1px] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out w-full flex justify-center items-center mb-3l"
                  type="button"
                  onClick={generateImage}
                >
                  {generatingImg ? "Generating..." : "Generate"}
                </button>
              </div>
              <div className="mt-6">
                <p className="p-3 -mb-6 text-[#666e75] text-sm">
                  ** Once you have created the image you want, you can share it
                  with others in the community **
                </p>
                {/* {loggedIn ? ( */}
                <button
                  type="submit"
                  className="my-6 px-7 py-3 bg-blue-600 text-white font-medium text-xs leading-snug uppercase rounded-md shadow-md sm:w-auto hover:bg-blue-500 hover:translate-y-[-1px] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out w-full flex justify-center items-center mb-3l"
                >
                  {isLoading ? "Sharing..." : "Share with the Community"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CreatePost;
