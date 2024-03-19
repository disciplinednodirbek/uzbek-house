import { Button, ImageList, ImageListItem, Paper } from "@mui/material";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

export default function ModeratingDetail() {
  return (
    <div className="pb-4">
      <h1 className="text-2xl font-semibold">Moderating detail</h1>
      <div className="mt-6">
        <ImageList sx={{ width: "100%", height: 500 }} cols={3} rowHeight={164}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                className="w-full h-full object-cover"
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      <div className="mt-6">
        <h1 className="text-lg font-semibold font-serif">User information</h1>
        <Paper className="p-4 mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-gray-500">Full name</p>
            <p className="font-semibold text-lg">Nodirbek Abduvahhobov</p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-semibold text-lg">+998 90 123 45 67</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-semibold text-lg">
              nodirbekabduvahhobov202@gmail.com
            </p>
          </div>
          <div>
            <p className="text-gray-500">Available time</p>
            <p className="font-semibold text-lg">Evening</p>
          </div>
        </Paper>
      </div>
      <div className="mt-6">
        <h1 className="text-lg font-semibold font-serif">
          Address and price information
        </h1>
        <Paper className="p-4 mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-gray-500">City</p>
            <p className="font-semibold text-lg">Tashkent</p>
          </div>
          <div>
            <p className="text-gray-500">Address</p>
            <p className="font-semibold text-lg">Tashkent, Uzbekistan</p>
          </div>

          <div>
            <p className="text-gray-500">Zip code</p>
            <p className="font-semibold text-lg">123456</p>
          </div>
          <div>
            <p className="text-gray-500">Price</p>
            <p className="font-semibold text-lg">120000/day</p>
          </div>
        </Paper>
      </div>

      <div className="mt-6">
        <h1 className="text-lg font-semibold font-serif">Rooms information</h1>
        <Paper className="p-4 mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-gray-500">Bedroom</p>
            <p className="font-semibold text-lg">1</p>
          </div>
          <div>
            <p className="text-gray-500">Bathroom</p>
            <p className="font-semibold text-lg">1</p>
          </div>

          <div>
            <p className="text-gray-500">Kitchen</p>
            <p className="font-semibold text-lg">1</p>
          </div>
          <div>
            <p className="text-gray-500">Balcony</p>
            <p className="font-semibold text-lg">included</p>
          </div>
        </Paper>
      </div>

      <div className="mt-6">
        <h1 className="text-lg font-semibold font-serif">Other information</h1>
        <Paper className="p-4 mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-gray-500">Square yard</p>
            <p className="font-semibold text-lg">2450</p>
          </div>
          <div>
            <p className="text-gray-500">Year buid</p>
            <p className="font-semibold text-lg">1980</p>
          </div>

          <div>
            <p className="text-gray-500">Current condiiton</p>
            <p className="font-semibold text-lg">Good</p>
          </div>
        </Paper>
      </div>
      <div className="mt-6">
        <h1 className="text-lg font-semibold font-serif">
          Maintenance description
        </h1>
        <Paper className="p-4 mt-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus
          delectus deserunt voluptates obcaecati autem necessitatibus officiis
          dolor commodi voluptatem veritatis reprehenderit temporibus ipsam
          pariatur ea maiores fugit alias, odit aut!
        </Paper>
      </div>
      <div className="mt-6 flex items-center float-end gap-4">
        <Button variant="contained" color="success">
          Accept
        </Button>

        <Button variant="contained" color="error" className="ml-2">
          Ban
        </Button>
      </div>
    </div>
  );
}
