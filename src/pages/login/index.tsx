import Button from "@/components/ui/button";
import "./style.scss";

const Login = () => {
  return (
    <div className="login_container">
      <div className="form_main_container" style={{ border: "2px solid" }}>
        <div className="form_container">
          <div className="form_header_container">
            <div>logo</div>
            <div className="form_header_content">
              <p className="heading1">Welcome Back!</p>
              <p className="description">Please Sign in to continue</p>
            </div>
          </div>

          <Button label="Login" onClick={() => {}} type="primary" />
        </div>
      </div>
      <div className="image_container">
        <img src="https://plus.unsplash.com/premium_photo-1668624623619-a16f5e15724d?q=80&w=1799&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
    </div>
  );
};

export default Login;
