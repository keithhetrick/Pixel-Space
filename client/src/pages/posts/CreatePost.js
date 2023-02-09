import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { preview } from "../../assets";
import { getRandomPrompt } from "../../utils";
import { FormField, Loader } from "../../components";
import ErrorMessage from "../../hooks/useErrorMessage";

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // change useHeaderButton title & link if not logged in
  useEffect(() => {
    if (!loggedIn) {
      const button = document.querySelector(".header__button");
      button.innerHTML = "Login";
      button.href = "/login";
    } else {
      const button = document.querySelector(".header__button");
      button.innerHTML = "Create";
      button.href = "/create-post";
    }
  }, [loggedIn]);

  // ERRORS VALIDATION
  const [errors, setErrors] = useState("");

  // HANDLERS
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  // URL'S
  const postUrl = "https://localhost:8000/api/dalle";
  const getUrl = "https://localhost:8000/api/post";

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
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      setTimeout(() => {
        setErrors("");
      }, 6000);
      setErrors("Please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await axios.post(
          getUrl,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
          { ...form }
        );

        await response.data;
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      setTimeout(() => {
        setErrors("");
      }, 6000);
      setErrors("Please enter a prompt and generate an image");
    }
  };

  const [randomPrompt, setRandomPrompt] = useState(
    getRandomPrompt(form.prompt)
  );

  useEffect(() => {
    setRandomPrompt(getRandomPrompt(form.prompt));
  }, [form.prompt]);

  // allow custom validation & disable browser validation
  useEffect(() => {
    const forms = document.getElementsByTagName("form");
    for (let i = 0; i < forms.length; i++) {
      forms[i].setAttribute("novalidate", true);
    }
  }, []);

  return (
    <div>
      <section className="max-w-7xl mx-auto">
        {/* <button
        className="font-inter font-medium bg-[#6469] -mt-1 text-white px-4 py-2 rounded-md hover:bg-[#b18eb199] hover:translate-y-[-1px] transition duration-200"
        onClick={() => navigate(-1)}
      >
        Back
      </button> */}
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
          <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
            Generate an imaginative image through DALL-E AI and share it with
            the community
          </p>
        </div>

        {errors && (
          <ErrorMessage
            variant={errors ? "danger" : "success"}
            message={errors}
          />
        )}

        <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Your Name"
              autoComplete="off"
              type="text"
              name="name"
              placeholder="Ex., john doe"
              value={form.name}
              handleChange={handleChange}
            />

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

            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center hover:border-gray-400 cursor-pointer  transition duration-200">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
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

          <div className="mt-5 flex gap-5">
            <button
              type="button"
              onClick={generateImage}
              className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-green-800 hover:translate-y-[-1px] transition duration-200"
            >
              {generatingImg ? "Generating..." : "Generate"}
            </button>
          </div>
          <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]">
              ** Once you have created the image you want, you can share it with
              others in the community **
            </p>

            {/* {loggedIn ? ( */}
            <button
              type="submit"
              className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-[#4d52e8] hover:translate-y-[-1px] transition duration-200"
            >
              {loading ? "Sharing..." : "Share with the Community"}
            </button>
            {/* ) : (
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="mt-5 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-centerhover:bg-[#4d52e8] hover:translate-y-[-1px] transition duration-200"
              >
                Login to Create
              </button>
            )} */}
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreatePost;
