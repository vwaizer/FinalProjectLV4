import React from "react";
import "./contact-page.css";
import Logo from "../../assets/Logo.jpg";
import Button from "../../common/button/button";
import ContactProps from "./ContactProps";
import RightContact from "./RightContact";
import FAQ from "./FAQ";
import Layout from "../../layout/Layout";

const Contactpage = () => {
  return (
    <Layout>
      <div className="contact-page">
        <div>
          <div class="C-container_1">
            <p class="C-container_title_1">GET IN TOUCH</p>
            <div class="C-sub-container_1">
              <div class="C-column_1">
                <div class="C-column-title">
                  <p class="C-sub_title">Send us an email</p>
                  <div class="C-child-box-subtitle_1"></div>
                </div>

                <div class="C-sub-column_1">
                  <div class="C-sub-column_1_1">
                    <div class="C-sub-column_1_1_1">
                      <ContactProps
                        title="Name"
                        Type="text"
                        Placeholder="Your name"
                      />
                    </div>
                    <div class="C-sub-column_1_1_1">
                      <ContactProps
                        title="Phone Number"
                        Type="text"
                        Placeholder="Your phone"
                      />
                    </div>
                  </div>
                  <div class="C-sub-column_1_1">
                    <div class="C-sub-column_1_1_1">
                      <ContactProps
                        title="Email"
                        Type="text"
                        Placeholder="Your Email"
                      />
                    </div>
                    <div class="C-sub-column_1_1_1">
                      <ContactProps
                        title="Subject"
                        Type="text"
                        Placeholder="Input text"
                      />
                    </div>
                  </div>
                  <div>
                    <div class="C-sub-column_1_1_1">
                      <div class="C-sub_title_2">
                        <label>Message</label>
                      </div>
                      <div>
                        <input
                          class="C-textbox--big"
                          type="text"
                          placeholder="Message"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="C-buton_submit">
                    <Button text="SUBMIT" btnStyle="auth-btn" />
                  </div>
                </div>
              </div>
              <div class="C-column_2"></div>
              <div class="C-column_3">
                <div class="C-column-title">
                  <p class="C-sub_title">Contact us</p>
                  <div class="C-child-box-subtitle_1"></div>
                </div>

                <div>
                  <RightContact
                    text=" Need assistance or have questions? Don't hesitate to get in
                    touch with us. ShineAura's customer care team is available
                    24/7 to assist you. Let us know how we can help. We're here
                    to listen and ensure you have the best shopping experience
                    on"
                    Addname="ShineAura"
                    title1="thisisouremail@gmail.com"
                    title2="(000) 000 0000"
                    title3=" Street Address #000, City, State, Zip ######"
                  />
                  <div class="C-sub-column_3">
                    <div>
                      <label>Contact our medias:</label>
                    </div>
                    <div class="C-contact-information">
                      <button>
                        {" "}
                        <i class="bi bi-facebook social-icon"></i>
                      </button>
                      <button>
                        <i class="bi bi-twitter-x social-icon"></i>
                      </button>
                      <button>
                        <i class="bi bi-instagram social-icon"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="C-container_2">
              <div class="C-container_title_2">
                <p class="C-FAQ_1">FAQ</p>
                <p class="C-FAQ_2">Frequently Asked Questions</p>
              </div>
              <div class="C-sub-container_2">
                <div class="C-column-title">
                  <img class="C-img" alt="" src={Logo} />
                  <div class="C-child-box-subtitle_2"></div>
                </div>
                <div>
                  <div>
                    <FAQ
                      title="What are the ingredients in your products?"
                      text="We highly value transparency and your well-being. Delve
                      into our product descriptions, where we disclose every
                      ingredient used. We are committed to ensuring that you
                      make informed choices by providing comprehensive details
                      about the composition of each product."
                    />
                  </div>
                  <div>
                    <FAQ
                      title="Are your products cruelty-free and vegan?"
                      text="Our commitment extends beyond quality skincare. We take
                      pride in our ethical stance: our products are cruelty-free
                      and entirely vegan. We've ensured that no animal-derived
                      ingredients find their way into our formulations. Feel
                      assured about the ethical integrity of our brand."
                    />
                  </div>
                  <div>
                    <FAQ
                      title="Do you offer any samples or trial sizes?"
                      text="Discover our products firsthand with trial-sized samples
                    or miniature versions available for purchase. We
                    understand the importance of experiencing a product before
                    making a significant commitment. Dip your toes into our
                    range with our convenient trial-sized options."
                    />
                  </div>
                  <div>
                    <FAQ
                      title="How do I return or exchange an item?"
                      text="We prioritize your satisfaction with our hassle-free
                    return or exchange process. Visit our Returns page, where
                    you'll find easy steps to initiate a return or exchange.
                    We strive to ensure that your shopping experience remains
                    stress-free."
                    />
                  </div>
                  <div>
                    <FAQ
                      title=" What are your shipping rates and policies?"
                      text="We provide detailed insights into our shipping procedures,
                    rates, and policies. Our Shipping Policy page houses
                    comprehensive information on shipping rates, estimated
                    delivery times, and other essential shipping terms.
                    Discover our commitment to seamless delivery."
                    />
                  </div>
                  <div>
                    <FAQ
                      title=" Which product is right for my skin type?"
                      text="Choosing the perfect skincare product tailored to your
                    skin type is vital. Explore our product range, each
                    detailed with specific benefits catered to various skin
                    types. For personalized guidance, reach out to us or refer
                    to our 'Suitable Skin Types' page."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contactpage;
