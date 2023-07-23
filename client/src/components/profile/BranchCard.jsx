import React from "react";
import { ModalContext } from "../../context/modal-context";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

const BranchCard = (props) => {
  const { branch } = props;
  let { handleModal } = React.useContext(ModalContext);

  return (
    <div className="border border-[#C75D2C] my-4 rounded-md p-4 text-white flex justify-between items-center w-[380px] sm:w-full md:w-2/3 lg:w-2/5 xl:w-3/5">
      <div>
        <h1 className="text-[#C75D2C] font-bold">
          {branch.name}, {branch.city}
        </h1>
        <p className="text-[#C75D2C] text-sm my-0">
          {branch.address}{" "}
          <span
            className="cursor-pointer hover:underline"
            onClick={() => {
              handleModal(
                branch.address,
                <MapContainer
                  className="map"
                  center={[branch.coords.longitude, branch.coords.latitude]}
                  zoom={16}
                  minZoom={3}
                  maxBounds={[
                    [-85.06, -180],
                    [85.06, 180],
                  ]}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[branch.coords.longitude, branch.coords.latitude]}
                  >
                    <Popup>
                      Ovde se nalazi ogranak <br /> {branch.name}, {branch.city}
                      .
                    </Popup>
                  </Marker>
                </MapContainer>
              );
            }}
          >
            (klikni za prikaz mape)
          </span>
        </p>
        <p className="text-[#C75D2C] text-sm my-0">{branch.phone}</p>
        <p className="text-[#C75D2C] text-sm my-0">{branch.worktime}</p>
      </div>
      <img
        width="64px"
        src={require("../../assets/icons8-library-building-50.png")}
        alt="A library icon"
      />
    </div>
  );
};

export default BranchCard;
