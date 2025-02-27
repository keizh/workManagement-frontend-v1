/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Select as SSingle, Option, Textarea } from "@material-tailwind/react";
import React from "react";
import auth from "../utils/auth";
import Select from "react-select";
import { postNewTeamASYNC } from "../features/infoSlice";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";

export function NewTeam() {
  const dispatch = useDispatch();
  const initialTeam = {
    name: "",
    description: "",
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const token = localStorage.getItem("token");
  const [team, setTeam] = useState(initialTeam);
  const [press, setPress] = useState(false);
  const [loader, setLoader] = useState(false);

  const onPressHandler = () => {
    if (team.name != "" && team.description != "") {
      setPress(true);
    } else {
      setPress(false);
    }
  };
  //  NS ~ NON - Select
  const onChangeHandlerNS = (e) => {
    const { name, value } = e.target;
    setTeam((team) => ({
      ...team,
      [name]: value.trim(),
    }));
  };

  useEffect(() => {
    onPressHandler();
  }, [team]);

  const onSubmitHander = async (event) => {
    event.preventDefault();
    if (!press) return;
    setLoader(true);
    await dispatch(postNewTeamASYNC(team));
    console.log(team);
    setTimeout(() => {
      setLoader(false);
      setPress(false);
      setTeam(initialTeam);
      handleOpen();
    }, 2000);
  };

  return (
    <>
      <Button className="p-5" color="green" onClick={handleOpen}>
        Create New Team
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <form onSubmit={onSubmitHander}>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Initiate Creation of New team
              </Typography>
              {/* task name ------------ */}
              <Typography className="-mb-2" variant="h6">
                Team Name
              </Typography>
              <Input
                onChange={onChangeHandlerNS}
                placeholder="Marketing-Team-Nestle-A1"
                label="Team Name"
                name="name"
                size="lg"
              />
              {/* Project description ------------ */}
              <Typography className="-mb-2" variant="h6">
                Task Name
              </Typography>
              <Textarea
                onChange={onChangeHandlerNS}
                label="Project Description"
                name="description"
                size="lg"
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                loading={loader}
                color={press ? "green" : "red"}
                fullWidth
                type="submit"
                className="flex justify-center gap-2"
              >
                Create Team
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
}
export default NewTeam;
