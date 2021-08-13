import React from "react";
import {
  Container,
  GridWrapper,
  GridColumnImg,
  GridColumnText,
  Title,
  TextContent,
  LocationIcon,
  TextWrapper,
  TimeIcon,
  PhoneIcon,
  EmailIcon,
} from "../../components/contact/ContactElements";

// google map
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBnM02stzOoaI9e8OjGhT3toFZQIe-w8uQ&libraries=places,geometry,drawing",

    loadingElement: <div style={{ height: `100%` }} />,
    // containerElement: <div style={{ height: `400px` }} />,
    containerElement: <div style={{ height: `700px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 23.128860562968097, lng: 113.26295270038605 }}
  >
    {props.isMarkerShown && (
      <Marker position={{ lat: 23.128860562968097, lng: 113.26295270038605 }} />
    )}
  </GoogleMap>
));

const ContactSection = () => {
  return (
    <Container id="contact-page">
      <GridWrapper>
        <GridColumnImg>
          <MapComponent isMarkerShown={true} />
        </GridColumnImg>
        <GridColumnText>
          <Title>联系方式</Title>
          <TextWrapper>
            <TextContent>
              <LocationIcon />
              xxx街道xxx路xx号
            </TextContent>
            <TextContent>
              <PhoneIcon />
              100-0000-0000
            </TextContent>
            <TextContent>
              <EmailIcon />
              lynn@demo.com
            </TextContent>
            <TextContent>
              <TimeIcon />
              9：00 - 20：00
            </TextContent>
          </TextWrapper>
        </GridColumnText>
      </GridWrapper>
    </Container>
  );
};

export default ContactSection;
