/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import getToken from "../../helpers/getToken";

const Authenticate = (props) => {
  const token = getToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [dispatch, navigate, token]);

  return <>{props.children}</>;
};

export default Authenticate;
