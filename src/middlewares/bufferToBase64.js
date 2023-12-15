
// Middleware to convert buffer to base64
const bufferToBase64 = (req, res, next) => {
  console.log("Entering bufferToBase64 middleware");

  if (res.locals.data) {
    res.locals.data = res.locals.data.map((item, index) => {
      if (item.outimage) {
        console.log("Item has outimage data");

        // Always convert Buffer data to a base64 string
        if (Buffer.isBuffer(item.outimage)) {
          console.log("Outimage data is a Buffer, converting to base64");
          let base64Image = item.outimage.toString('base64');
          item.outimage = base64Image;
        }else {
          console.log("the image is already a base64 string");
        }
      }
      return item;
    });
  } else {
    console.log("res.locals.data does not exist");
  }

  next();
};

const generatedToBase64 = (req, res, next) => {
  if (res.locals.data) {
    // Convert the image buffer to a base64 string
    const base64Image = Buffer.from(res.locals.data).toString('base64');

    // Replace the image buffer with the base64 string
    res.locals.data = base64Image;
  }

  next();
};
export { bufferToBase64, generatedToBase64 };