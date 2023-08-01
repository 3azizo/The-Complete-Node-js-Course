const geocode = (address, callback) => {
  setTimeout(() => {
    let data = {
      location: address,
      latitude: 0,
      longitude: 0,
    };
    callback(data);
  }, 3000);
};

geocode("cairo", (data) => {
  console.log(data);
});

const add = (nums, callback) => {
  setTimeout(() => {
    let sum = nums.reduce((prev, curr) => prev + curr, 0);
    callback(sum);
  }, 2000);
};

add([15, 15, 75], (sum) => {
  console.log(sum);
});
