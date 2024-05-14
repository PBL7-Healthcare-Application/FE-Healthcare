import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import "./SignInBtn.scss";
const SignInBtn = () => {
  const navigate = useNavigate();
  return (
    <Space>
      <Button
        className="header-signIn-btn"
        type="primary"
        onClick={() => navigate("/auth/sign-in")}
      >
        Sign In
      </Button>
    </Space>
  );
};

export default SignInBtn;
