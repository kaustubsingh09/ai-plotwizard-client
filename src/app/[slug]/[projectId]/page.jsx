"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";
import Link from "next/link";
import projectServices from "@/firebase/services/projectServices";
import characterServices from "@/firebase/services/characterServices";
import plotServices from "@/firebase/services/plotServices";
import settingServices from "@/firebase/services/settingServices";
import { GrLinkPrevious } from "react-icons/gr";
import { AiOutlineSave } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import RenderAllCharacters from "@/components/storyCollections/character/RenderAllCharacters";
import DeleteModal from "@/components/DeleteModal";
import RenderPlotInput from "@/components/storyCollections/plot/RenderPlotInput";
import StorySettings from "@/components/storyCollections/setting/StorySettings";
import storyServices from "@/firebase/services/storyServices";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { triggerRender } from "@/slice/projectSlice";
import { useDispatch } from "react-redux";

export default function Project({ params }) {
  const projectId = params.projectId;
  const [individualProject, setIndividualProject] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [allCharacters, setAllCharacters] = useState(null);
  const [previousSettings, setPreviousSettings] = useState("");
  const [allPlot, setAllPlot] = useState("");
  const [storyResponse, setStoryResponse] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [genratingResponse, setGeneratingResponse] = useState(false);
  const [storyId, setStoryId] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [prevStory, setPreviousStory] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const user = () =>
    onAuthStateChanged(auth, (state) => {
      const currentUser = state.displayName;
      if (currentUser) {
        setCurrentUser(currentUser);
      }
    });

  const showResultHandler = () => {
    // router.push(`/${[currentUser]}/${[projectId]}/${[storyId]}`);
    setShowResult(!showResult);
  };

  const getStoryByProjectId = async () => {
    try {
      const story = await storyServices.getAllgeneratedStories(projectId);
      const allStory = story?.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStoryId(allStory[0]?.id);
    } catch (err) {
      console.log("error", err);
    }
  };

  const saveStory = async () => {
    try {
      if (storyId) {
        await storyServices.updatestory(storyId, {
          project_id: projectId,
          story: storyResponse,
          img_url: imgUrl,
        });
      } else {
        await storyServices.addstory({
          project_id: projectId,
          story: storyResponse,
          img_url: imgUrl,
        });
      }
      dispatch(triggerRender());
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleProjectById = async () => {
    try {
      const data = await projectServices.getSingleProject(projectId);
      setIndividualProject(data.data());
      const projectFullName = data.data().project_name;
      if (projectFullName) {
        setProjectName(projectFullName);
      }

      if (data) {
        setIsLoading(false);
      }
    } catch (err) {
      console.log("error while fetching project", err);
      setIsLoading(false);
    }
  };
  const deleteProjectHandler = async () => {
    await projectServices.deleteProject(projectId);
    router.back();
  };

  useEffect(() => {
    if (projectId) {
      getSingleProjectById();
    }
    if (projectName) {
      getAllStoryDetails(); // ===> this is to get all the project details function execution;
    }
    if (projectName) {
      user();
    }
    if (projectName) {
      getStoryByProjectId();
    }
  }, [projectId, projectName]);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  const getAllStoryDetails = async () => {
    try {
      const characterData = await characterServices.getAllcharacters(projectId);
      const characters = characterData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const characterNames = characters.map((el) => el.character_name);
      const characterAppearance = characters.map((el) => el.appearance);
      const characterBackstory = characters.map((el) => el.backstory);
      const characterDetails = {
        name: characterNames,
        appearance: characterAppearance,
        details: characterBackstory,
      };
      if (characterDetails) {
        setAllCharacters(characterDetails);
      }

      const settingsData = await settingServices.getAllsettings(projectId);
      const allSettings = settingsData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const setting = allSettings[0]?.setting_details;
      setPreviousSettings(setting);

      const plotData = await plotServices.getAllplot(projectId);
      const allPlots = plotData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const plot = allPlots[0].plot_details;
      setAllPlot(plot);
    } catch (err) {
      console.log("error while fetching data", err);
    }
  };

  const sendStoryDetailsRequest = async () => {
    try {
      setGeneratingResponse(true);
      const response = await axios.post("http://localhost:8001/api/story", {
        characters: allCharacters,
        plot: allPlot,
        settings: previousSettings,
      });
      console.log(response);
      if (response?.data) {
        setStoryResponse(response.data?.data?.text);
        setImgUrl(response.data?.image);
        setGeneratingResponse(false);
      }
    } catch (err) {
      console.log("error while sending request", err);
    } finally {
      setGeneratingResponse(false);
    }
  };
  if (genratingResponse) {
    return (
      <div className="flex justify-center h-screen">
        <div className="flex items-center">
          <HashLoader color="#36d7b7" />
        </div>
      </div>
    );
  }

  // {genratingResponse ? (
  //   return
  // ) : null}

  return (
    <div className="flex flex-col mt-3">
      <div className="flex flex-row gap-3 justify-center text-neutral-content rounded-xl">
        <ul className="menu menu-horizontal bg-base-200 rounded-box">
          <li>
            {individualProject && (
              <span className="font-bold">
                {individualProject?.project_name}
              </span>
            )}
          </li>
          <li>
            <button
              onClick={() => router.back()}
              className="tooltip"
              data-tip="Filter"
            >
              <div className="flex flex-row gap-2 ">
                <GrLinkPrevious size={20} />
                <span className=" font-semibold">Go Back</span>
              </div>
            </button>
          </li>
          <li>
            <DeleteModal
              deleteAction={deleteProjectHandler}
              projectName={projectName}
            />
          </li>
        </ul>
      </div>
      <div className="">
        <RenderAllCharacters projectId={projectId} />
      </div>
      <div className="flex justify-center gap-5  p-5 flex-wrap bg-gray-800">
        {showResult ? (
          <div className="p-5">
            <div className="flex gap-3 justify-center sm:justify-end  border bg-gray-700 top-0 sticky border-gray-600 rounded-lg p-2">
              <button
                onClick={() => setShowResult(!showResult)}
                className="btn bg-gray-800 border-none"
              >
                <GrLinkPrevious size={15} />
                <span>Go back</span>
              </button>
              <button onClick={saveStory} className="btn">
                <AiOutlineSave size={15} />
                <span>Save</span>
              </button>
              <button onClick={saveStory} className="btn">
                <AiOutlineEdit size={15} />
                <span>Edit</span>
              </button>
            </div>
            <div className="max-h-60 overflow-scroll mt-5 p-5">
              <div className="flex flex-row justify-around">
                <div className=" w-1/2">{storyResponse}</div>
                <div>
                  {imgUrl && (
                    <img
                    loading="lazy"
                      src={imgUrl}
                      height={300}
                      width={300}
                      alt="image from prompt"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center flex-wrap">
            <RenderPlotInput projectId={projectId} />
            <StorySettings projectId={projectId} />
            {/* setting input here */}
            <div className="flex flex-col justify-center items-center gap-2">
              <button onClick={sendStoryDetailsRequest} className="btn ">
                Generate Story
              </button>

              {storyResponse && (
                <button className="btn" onClick={showResultHandler}>
                  Show Result
                </button>
              )}
            </div>
          </div>
        )}
        {/* plot input here */}
      </div>
    </div>
  );
}
