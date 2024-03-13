import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Controller, useForm } from "react-hook-form";
import RemoveIcon from "@mui/icons-material/Remove";
import Map from "components/Map";
import HomeCard from "components/HomeCard";

const rooms = [
  { id: 1, label: "Living room" },
  { id: 2, label: "Bedroom" },
  { id: 3, label: "Bathroom" },
  { id: 4, label: "Kitchen" },
  { id: 5, label: "Balcony" },
  { id: 6, label: "Garage" },
  { id: 7, label: "Garden" },
];

export default function Buy() {
  const [pricePopover, setPricePopover] = useState(null);
  const [roomsPopover, setRoomsPopover] = useState(null);
  const [data, setData] = useState([]);
  const { handleSubmit, control } = useForm();

  const openPricePopover = (event) => {
    setPricePopover(event.currentTarget);
  };

  const openRoomsPopover = (event) => {
    setRoomsPopover(event.currentTarget);
  };

  async function onSubmit(data) {
    console.log(data);
  }

  useEffect(() => {
    setData(Array.from({ length: 4 }));
  }, []);

  const priceId = pricePopover ? "price-popover" : undefined;
  const roomsId = roomsPopover ? "rooms-popover" : undefined;
  return (
    <div>
      <header className="p-4 shadow-md sticky top-0 z-50 bg-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap items-center justify-start gap-4"
        >
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="search"
                className="w-[300px]"
                variant="outlined"
                label="Address"
                size="small"
              />
            )}
          />
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <FormControl size="small" className="w-[250px]">
                <InputLabel id="select_type">Select type</InputLabel>
                <Select
                  labelId="select_type"
                  id="select_type"
                  label="select_type"
                  {...field}
                >
                  <MenuItem value={1}>For Sell</MenuItem>
                  <MenuItem value={2}>For Rent</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <div>
            <Button
              aria-describedby={priceId}
              onClick={openPricePopover}
              endIcon={<ExpandMoreIcon />}
              variant="outlined"
              color="inherit"
            >
              Price
            </Button>
            <Popover
              sx={{ width: "100%" }}
              id={priceId}
              open={Boolean(pricePopover)}
              anchorEl={pricePopover}
              onClose={() => setPricePopover(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div className="p-4 flex flex-wrap gap-4 item-center">
                <Controller
                  name="min_price"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      size="small"
                      {...field}
                      label="Min Price"
                      type="number"
                    />
                  )}
                />
                <div>
                  <RemoveIcon className="mt-2" />
                </div>
                <Controller
                  name="max_price"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      size="small"
                      {...field}
                      label="Max Price"
                      type="number"
                    />
                  )}
                />
              </div>
            </Popover>
          </div>
          <div>
            <Button
              aria-describedby={roomsId}
              onClick={openRoomsPopover}
              endIcon={<ExpandMoreIcon />}
              variant="outlined"
              color="inherit"
            >
              Rooms
            </Button>
            <Popover
              sx={{ width: "100%" }}
              id={roomsId}
              open={Boolean(roomsPopover)}
              anchorEl={roomsPopover}
              onClose={() => setRoomsPopover(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div className="p-4">
                {rooms.map((room) => (
                  <div key={room.id} className="flex items-center gap-2">
                    <Controller
                      name="rooms"
                      control={control}
                      render={({ field }) => <Checkbox {...field} />}
                      value={room.id}
                      size="small"
                    />
                    <p>{room.label}</p>
                  </div>
                ))}
              </div>
            </Popover>
          </div>
          <Button type="submit" className="!bg-[#1F2C40] !text-white px-4 py-2">
            Search
          </Button>
        </form>
      </header>
      <div className="flex items-center justify-center flex-wrap">
        <div className="mobile:w-full md:w-1/2 z-40">
          <Map height={"100vh"} />
        </div>
        <div className="mobile:w-full md:w-1/2 flex flex-wrap items-start justify-center gap-4 h-[100vh] overflow-x-auto p-6">
          {data.map((item, index) => {
            return <HomeCard key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}
