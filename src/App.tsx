import {
  Aside,
  Button,
  Card,
  Dialog,
  Drawer,
  Dropdown,
  error,
  Grid,
  Icon,
  info,
  Input,
  NotificationContainer,
  success,
  Switcher,
  warning,
} from "@/components";


import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  const [openAside, setOpenAside] = useState(false);
  const [openDarkAside, setOpenDarkAside] = useState(false);

  const [activeSwitcher, setActivceSwitcher] = useState(false);

  return (
    <div className="min-h-[200vh] w-screen gap-10 flex flex-col  py-10  items-center bg-gradient-to-bl from-[#882929] to-[#0d3884]">
      <div className="flex flex-row gap-2">
        <Button onClick={() => setOpen(true)} className="w-24">
          Open
        </Button>
        <Input />
        <Button
          variant="darker"
          className=""
          onClick={() => setOpenAside(true)}
        >
          Open Aside
        </Button>
        <Input variant="darker" />
      </div>

      <div className="flex flex-row gap-2">
        <Dropdown placeholder="Dropdown">
          <Dropdown.Content>
            <Dropdown.Item>First</Dropdown.Item>
            <Dropdown.Item>Secod</Dropdown.Item>
            <Dropdown.Item>Third</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
        <Dropdown placeholder="Dropdown" variant="darker">
          <Dropdown.Content>
            <Dropdown.Item>123</Dropdown.Item>
            <Dropdown.Item>123</Dropdown.Item>
            <Dropdown.Item>123</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
        <Button variant="darker">Open Dark Aside</Button>
      </div>

      <div className="flex flex-row gap-2">
        <Card className="max-w-[500px]">
          <Card.Header>Post Malone</Card.Header>
          <Card.Content>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia
            repellat praesentium similique! Nobis asperiores quas laudantium ex
            officia saepe neque illum sapiente dolorum sit? Nulla veniam amet
            dignissimos quisquam est? Esse quibusdam error nostrum quidem iste!
            Libero fuga unde accusantium sapiente ad animi ea quaerat, velit
            enim adipisci vitae consequatur similique distinctio odio voluptates
            vel, atque sunt accusamus molestiae magnam. Dolore sed ipsam unde,
            minima fugit odit neque veniam nesciunt! Autem modi, necessitatibus
            molestias aliquid unde, libero veniam, rerum saepe provident itaque
            fugit placeat voluptas. Dicta facere iste minus sit!
          </Card.Content>
        </Card>
        <Card variant="darker" className="max-w-[500px]">
          <Card.Header>Post Malone</Card.Header>
          <Card.Content variant="darker">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia
            repellat praesentium similique! Nobis asperiores quas laudantium ex
            officia saepe neque illum sapiente dolorum sit? Nulla veniam amet
            dignissimos quisquam est? Esse quibusdam error nostrum quidem iste!
            Libero fuga unde accusantium sapiente ad animi ea quaerat, velit
            enim adipisci vitae consequatur similique distinctio odio voluptates
            vel, atque sunt accusamus molestiae magnam. Dolore sed ipsam unde,
            minima fugit odit neque veniam nesciunt! Autem modi, necessitatibus
            molestias aliquid unde, libero veniam, rerum saepe provident itaque
            fugit placeat voluptas. Dicta facere iste minus sit!
          </Card.Content>
        </Card>
      </div>

      <Aside open={openAside} onClose={() => setOpenAside(false)}>
        <div className="flex flex-col gap-4">
          <Card>
            <Card.Header>Hello from aside</Card.Header>
            <Input />
            <Button>Say Hi!</Button>
          </Card>
        </div>
      </Aside>

      <Aside
        position="left"
        variant="darker"
        open={openDarkAside}
        onClose={() => setOpenDarkAside(false)}
      >
        <div className="flex flex-col gap-4">
          <Card variant="darker">
            <Card.Header>Hello from aside</Card.Header>
            <Input variant="darker" />
            <Button variant="darker">Say Hi!</Button>
          </Card>
        </div>
      </Aside>

      <div className="flex gap-2">
        <Icon>Icon</Icon>
        <Icon>Icon 2</Icon>
        <Icon>Icon 3</Icon>
      </div>

      <Grid columns={4} gap={24}>
        <Grid.Row>
          <Grid.Col col={4}>Заголовок</Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col col={2}>Левая часть</Grid.Col>
          <Grid.Col col={2}>Правая часть</Grid.Col>
        </Grid.Row>
      </Grid>

      <div className="flex gap-2">
        <NotificationContainer />

        <Switcher
          active={activeSwitcher}
          onActive={() => setActivceSwitcher(!activeSwitcher)}
        />
        <Switcher
          active={activeSwitcher}
          onActive={() => setActivceSwitcher(!activeSwitcher)}
          variant="darker"
        />
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => {
            success({
              message: "Suc",
            });
          }}
        >
          Success
        </Button>

        <Button
          onClick={() => {
            error({
              message: "Suc",
            });
          }}
        >
          Error
        </Button>

        <Button
          onClick={() => {
            info({
              message: "Suc",
            });
          }}
        >
          Info
        </Button>

        <Button
          onClick={() => {
            warning({
              message: "Suc",
            });
          }}
        >
          Warning
        </Button>
      </div>

      <Drawer open={open} onClose={() => setOpen(false)}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia,
        minus.
      </Drawer>

      <Dialog>
        <Dialog.Trigger>Open Dialog</Dialog.Trigger>
        <Dialog.Content>Hello from dialog</Dialog.Content>
      </Dialog>
      
    </div>
  );
}

export default App;
