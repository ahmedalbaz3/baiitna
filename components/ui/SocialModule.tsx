import Image from "next/image";
import React from "react";
import Button from "../shared/Button";

const SocialModule = ({
  popUp,
  googleRegisterButton,
  setPopUp,
}: {
  popUp: any;
  googleRegisterButton: any;
  setPopUp: any;
}) => {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-2xl bg-white z-20 p-[60px] w-[688px]">
        <div className="module-head mb-5 text-center">
          <Image
            src="/logo.svg"
            alt="Baiitna Logo"
            width={150}
            height={150}
            className="mx-auto mt-10 mb-7"
          />
          <p className="font-medium text-base">Complete your data</p>
        </div>
        <div className="module-body">
          <form
            action=""
            onSubmit={(e) => {
              (e.preventDefault(),
                googleRegisterButton({
                  firstName: popUp.data.firstName!,
                  lastName: popUp.data.lastName!,
                  email: popUp.data.email!,
                  providerId: popUp.data.providerId!,
                  accessToken: popUp.data.token!,
                }));
            }}
          >
            <div className="my-5 ">
              <label htmlFor="email" className="label-block">
                firstName
              </label>
              <input
                type="text"
                id="first name"
                className={`input-field`}
                value={popUp.data.firstName || ""}
                onChange={(e) =>
                  setPopUp({
                    show: true,
                    type: "register",
                    data: {
                      ...popUp.data,
                      firstName: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="my-5 ">
              <label htmlFor="email" className="label-block">
                lastName
              </label>
              <input
                type="text"
                id="last name"
                className={`input-field`}
                value={popUp.data.lastName || ""}
                onChange={(e) =>
                  setPopUp({
                    show: true,
                    type: "register",
                    data: {
                      ...popUp.data,
                      lastName: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="my-5 ">
              <label htmlFor="email" className="label-block">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className={`input-field`}
                value={popUp.data.email || ""}
                onChange={(e) =>
                  setPopUp({
                    show: true,
                    type: "register",
                    data: {
                      ...popUp.data,
                      email: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="flex gap-4">
              <Button
                text="Cancel"
                className="w-full mt-5 hover:bg-gray-200/50 bg-gray-200 text-black"
                type="button"
                onClick={() =>
                  setPopUp({
                    show: false,
                    type: "",
                    data: {
                      firstName: "",
                      lastName: "",
                      email: "",
                      providerId: "",
                      token: "",
                    },
                  })
                }
              />
              <Button
                text="Save"
                className="w-full mt-5 hover:bg-primary/50 bg-primary"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
    </>
  );
};

export default SocialModule;
