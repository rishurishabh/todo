import useLocalStorage from "use-local-storage";
import "./App.scss";
import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { Box, Button, Card, CardContent, Checkbox, Container, FormControlLabel, Grid, IconButton, Switch, Tab, Tabs, TextField, Typography, styled } from "@mui/material";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const Task = ({ task, index, completeTask, removeTask }) => {
  console.log(task, index);
  return (
    <Card key={index} className="card">
      <Grid container className="wrapper">
        <Grid item xs={12} sm={2} md={2} lg={1} xl={1}>
          <Checkbox className={task.completed ? 'active-checkbox' : 'in-active-checkbox'} checked={task?.completed} onChange={() => completeTask(index)} />
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={10} xl={10}>
          <Typography variant="subtitle1" className={`task ${task.completed && 'completed'}`}>
            {task.title}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2} md={2} lg={1} xl={1}>
          <IconButton onClick={() => removeTask(index)}>
            <RiDeleteBinLine />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
};

const CreateTask = ({ addTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title) return;

    addTask(title);
    setTitle("");
  };

  return (
    <Container maxWidth="xl" className="create-task">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>
          <TextField
            variant="outlined"
            size="small"
            type="text"
            className="input"
            fullWidth
            value={title}
            placeholder="Add a new task"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <Button className="btn" onClick={handleSubmit} startIcon={<IoMdAddCircle />}>
            Add New Task
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

const tabs = [
  {
    index: 0,
    name: "All",
  },
  {
    index: 1,
    name: "Pending",
  },
  {
    index: 2,
    name: "Completed",
  },
];



function App() {
  const defaultTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultTheme ? "dark" : "light"
  );
  const [activeTab, setActiveTab] = useState(0);

  const [taskList, setTaskList] = useState([]);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const addNewTask = (title) => {
    const newTask = [...taskList, { title: title, completed: false }];
    setTaskList(newTask);
  };

  const completeTask = (index) => {
    const newTask = [...taskList];
    newTask[index].completed = !newTask[index].completed;
    setTaskList(newTask);
  };

  const removeTask = (index) => {
    const newTask = [...taskList];
    newTask.splice(index, 1);
    setTaskList(newTask);
  };

  const handleTab = (e, newVal) => {
    setActiveTab(newVal)
  }

  const TaskList = ({ activeTab }) => {
    const [list, setList] = useState([]);
    useEffect(() => {
      switch (activeTab) {
        case 0:
          setList(taskList);
          break;
        case 1:
          const pendingList = taskList?.filter((item) => item.completed === false);
          setList(pendingList);
          break;
        case 2:
          const completedList = taskList?.filter((item) => item.completed === true);
          console.log({ completedList })
          setList(completedList);
          break;
        default:
          setList(taskList)
      }

    }, [activeTab]);

    return <Grid container spacing={2}>
      {list?.map((item, idx) => {
        return (
          <Grid key={idx} item xs={12}>
            <Task
              task={item}
              index={idx}
              completeTask={completeTask}
              removeTask={removeTask}
            />
          </Grid>

        );
      })}

    </Grid>
  }
  return (
    <div className="App" data-theme={theme}>
      <Box className="header">
        <FormControlLabel
          control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked onClick={switchTheme} />}
          label="Theme"
        />
      </Box>
      <Container maxWidth="lg" className="content-container">
        <Card className="task-list-card">
          <CardContent>
            <CreateTask addTask={addNewTask} />

            <Tabs
              value={activeTab}
              onChange={handleTab}
              textColor="secondary"
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              indicatorColor="secondary"
            >
              {
                tabs?.map((tab, idx) => {
                  return <Tab key={idx} value={tab.index} label={tab.name} />
                })
              }
            </Tabs>
            <Box component={'div'} className="list-container">
              <TaskList activeTab={activeTab} />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default App;
