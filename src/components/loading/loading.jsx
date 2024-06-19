import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { ConfigProvider, Modal } from "antd";
import loadingJson from "../../assets/images/loading.json";
import "./loading.scss";
const Loading = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: "transparent",
            boxShadow: "none",
          },
        },
      }}
    >
      <Modal
        className="loading"
        open={true}
        centered={true}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        closeIcon={null}
        style={{
          paddingBottom: 0,
          borderRadius: 10,
          position: "relative",
        }}
      >
        <Player
          autoplay
          loop
          src={loadingJson}
          style={{
            width: "800px",
            height: "500px",
            padding: 0,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Controls
            visible={false}
            //   buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
      </Modal>
    </ConfigProvider>
  );
};

export default Loading;
