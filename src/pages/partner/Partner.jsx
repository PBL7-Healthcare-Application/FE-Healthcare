import { Button, Image } from "antd";
import partner1 from "../../assets/images/partner1.webp";
import error from "../../assets/images/error.png";
import benefit_1 from "../../assets/images/benefit_1.webp";
import benefit_2 from "../../assets/images/benefit_2.webp";
import benefit_3 from "../../assets/images/benefit_3.webp";
import benefit_4 from "../../assets/images/benefit_4.webp";
import step_1 from "../../assets/images/step_1.webp";
import step_2 from "../../assets/images/step_2.webp";
import "./Partner.scss";

const Partner = () => {
  return (
    <div className="partner">
      <div className="partner-main">
        <div className="partner-content1">
          <div className="partner-content1__left">
            <div style={{ width: "100%" }}>
              <span className="partner-font">Enclinic</span>
            </div>
            <span
              className="partner-font"
              style={{ fontSize: 40, color: "#000", fontWeight: 600 }}
            >
              {" "}
              need dedicated doctors like you
            </span>
            <div style={{ width: "100%", marginTop: 40 }}>
              <Button className="partner-content1__left-button">
                Join Our Team
              </Button>
            </div>
          </div>
          <div className="partner-content1__right">
            <Image
              src={partner1}
              fallback={error}
              preview={false}
              width="100%"
              className="partner-content1__right-img"
            />
          </div>
        </div>
        <div className="partner-content2">
          <span
            className="partner-font"
            style={{
              fontSize: 35,
              color: "#000",
              fontWeight: 600,
              marginBottom: 30,
            }}
          >
            What are the benefits of being a doctor?
          </span>
          <div className="partner-content2__benefit">
            <div className="partner-content2__item">
              <Image src={benefit_1} width={200} />
              <span className="partner-content2__item-textMain">
                Convenient Health Consultation
              </span>
              <span className="partner-content2__item-text">
                Doctors can easily provide direct medical examinations and
                treatments to multiple individuals, as well as offer
                consultations to patients from anywhere without the need for
                travel
              </span>
            </div>
            {/* ====== */}
            <div className="partner-content2__item">
              <Image src={benefit_2} width={200} />
              <span className="partner-content2__item-textMain">
                Flexible Time
              </span>
              <span className="partner-content2__item-text">
                Doctors can choose the most suitable time of the day to
                participate in medical examinations or consultations.
              </span>
            </div>
            {/* ======= */}
            <div className="partner-content2__item">
              <Image src={benefit_3} width={200} />
              <span className="partner-content2__item-textMain">
                Developing Skills & Expertise
              </span>
              <span className="partner-content2__item-text">
                Participating in answering health-related inquiries helps
                improve the skills of doctors, as well as allows them to acquire
                additional knowledge through sharing with other colleagues at
                Enclinic.
              </span>
            </div>
            {/* ======= */}
            <div className="partner-content2__item">
              <Image src={benefit_4} width={200} />
              <span className="partner-content2__item-textMain">
                Enhancing Reputation & Income
              </span>
              <span className="partner-content2__item-text">
                With the doctor rating system, assisting more people will
                enhance trust from users and increase income opportunities
                through direct health consultations.
              </span>
            </div>
          </div>
        </div>
        <div className="partner-content3">
          <div className="partner-content3__left">
            <div className="partner-content3__left-textArea">
              <span className="partner-content3__left-text">
                Create a doctor profile
              </span>
              <span
                className="partner-content3__left-text"
                style={{ color: "#185FA0", fontSize: 40 }}
              >
                Free
              </span>
              <span className="partner-content3__left-text">
                with just 2 simple steps
              </span>
            </div>
            <div className="partner-content3__left-content">
              <div className="partner-content3__left-content__item">
                <Image src={step_1} width={100} />
                <div className="partner-content3__left-content__step">
                  <span className="partner-content3__left-content__text">
                    Step 1
                  </span>
                  <span
                    style={{ maxWidth: 300, fontWeight: 400 }}
                    className="partner-content3__left-content__text"
                  >
                    Create a new doctor profile using the registration form.
                  </span>
                </div>
              </div>
              <div className="partner-content3__left-content__item">
                <Image src={step_2} width={100} />
                <div className="partner-content3__left-content__step">
                  <span className="partner-content3__left-content__text">
                    Step 2
                  </span>
                  <span
                    className="partner-content3__left-content__text"
                    style={{ maxWidth: 300, fontWeight: 400 }}
                  >
                    Enclinic verifies profiles.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="partner-content3__right">bui</div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
