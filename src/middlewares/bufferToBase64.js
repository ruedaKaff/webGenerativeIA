
// Middleware to convert buffer to base64
const bufferToBase64 = (req, res, next) => {
  console.log("Entering bufferToBase64 middleware");

  if (res.locals.data) {
    // console.log("res.locals.data exists");
    // console.log("First item's outimage:", res.locals.data[0].outimage);

    res.locals.data = res.locals.data.map((item, index) => {
      console.log(`Processing item at index ${index}`);

      if (item.outimage) {
        console.log("Item has outimage data, converting to base64");
        let base64Image = item.outimage.toString('base64'); // Convert item.outimage directly to base64
        item.outimage = base64Image;
      } else {
        console.log("Item does not have outimage data, skipping conversion");
      }

      return item;
    });
  } else {
    console.log("res.locals.data does not exist");
  }

  console.log("Exiting bufferToBase64 middleware");
  next();
};
export { bufferToBase64 };