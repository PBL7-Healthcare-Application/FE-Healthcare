import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";

const HomePage = () => {
  return (
    <Layout className="home" style={{ backgroundColor: "#fff" }}>
      <Header />
      <Outlet />
      <Footer />
    </Layout>
  );
};

export default HomePage;
