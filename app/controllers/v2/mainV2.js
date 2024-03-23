import Food from "../../models/v2/Food.js";

let foodIdEdit = null;

const layThongTinMonAn = () => {
  // ES6
  const elements = document.querySelectorAll(
    "#foodForm input, #foodForm select, #foodForm textarea"
  );
  let food = {};
  elements.forEach((element) => {
    const { name, value } = element;
    food[name] = value;
  });
  console.log("food", food);
  return new Food(
    food.maMon,
    food.tenMon,
    food.loaiMon,
    food.giaMon,
    food.khuyenMai,
    food.tinhTrang,
    food.hinhAnh,
    food.moTa
  );
};

// Lấy danh sách món ăn từ API
const getFoodList = () => {
  const promise = axios({
    url: "https://653122f94d4c2e3f333c72a3.mockapi.io/food",
    method: "GET",
  });
  // Call API thành công
  promise
    .then((res) => {
      console.log(res.data);
      renderTable(res.data);
    })
    // Call API thất bại
    .catch((err) => {
      console.log(err);
    })
    // Luôn luôn chạt vào sau khi call API bất kể thành công hay thất bại
    .finally(() => console.log("Call API done"));
};

getFoodList();

// Hiển thị danh sách sp ra lên table
const renderTable = (foodList) => {
  let htmls = "";
  foodList.forEach((food) => {
    const foodWithMethod = new Food(
      food.maMon,
      food.tenMon,
      food.loaiMon,
      food.giaMon,
      food.khuyenMai,
      food.tinhTrang,
      food.hinhAnh,
      food.moTa
    );
    htmls += `
    <tr>
      <th>${foodWithMethod.maMon}</th>
      <th>${foodWithMethod.tenMon}</th>
      <th>${foodWithMethod.mapLoaiMon()}</th>
      <th>${foodWithMethod.giaMon}</th>
      <th>${foodWithMethod.khuyenMai}</th>
      <th>${foodWithMethod.giaKM()}</th>
      <th>${foodWithMethod.mapTinhTrang()}</th>
      <th><button class="btn btn-danger" onclick="deleteFood(${
        food.id
      })">Delete</button>
      <button class="btn btn-warning" onclick="editFood(${
        food.id
      })" data-toggle="modal" data-target="#exampleModal"
      >Edit</button></th>
    </tr>
    `;
  });
  document.querySelector("#tbodyFood").innerHTML = htmls;
};

// Thêm món ăn
document.querySelector("#btnThemMon").onclick = () => {
  const food = layThongTinMonAn();
  // Call API thêm món ăn
  const promise = axios({
    url: "https://653122f94d4c2e3f333c72a3.mockapi.io/food",
    method: "POST",
    data: food,
  });
  promise
    .then((res) => {
      console.log(res.data);
      $("#exampleModal").modal("hide");
      // Call API thành công => gọi lại API lấy danh sách sp
      getFoodList();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Xoá món ăn
window.deleteFood = (foodId) => {
  // Call API xoá món ăn khỏi data
  const promise = axios({
    url: `https://653122f94d4c2e3f333c72a3.mockapi.io/food/${foodId}`,
    method: "DELETE",
  });
  promise
    .then(() => {
      // Call API thành công => gọi lại API lấy danh sách sp
      getFoodList();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Open modal edit món ăn
window.editFood = (foodId) => {
  foodIdEdit = foodId;
  // Call API lấy thông tin chi tiết sản phẩm
  const promise = axios({
    url: `https://653122f94d4c2e3f333c72a3.mockapi.io/food/${foodId}`,
    method: "GET",
  });
  promise
    .then((res) => {
      console.log(res.data);
      const food = res.data;
      document.querySelector("#foodID").value = food.maMon;
      document.querySelector("#tenMon").value = food.tenMon;
      document.querySelector("#loai").value = food.loaiMon;
      document.querySelector("#giaMon").value = food.giaMon;
      document.querySelector("#khuyenMai").value = food.khuyenMai;
      document.querySelector("#tinhTrang").value = food.tinhTrang;
      document.querySelector("#hinhMon").value = food.hinhAnh;
      document.querySelector("#moTa").value = food.moTa;
    })
    .catch((err) => {
      console.log(err);
    });
};

// Cập nhật món ăn
window.updateFood = (foodId) => {
  const food = layThongTinMonAn();
  const promise = axios({
    url: `https://653122f94d4c2e3f333c72a3.mockapi.io/food/${foodId}`,
    method: "PUT",
    data: food,
  });
  promise
    .then((res) => {
      console.log(res.data);
      $("#exampleModal").modal("hide");
      // Call API thành công => gọi lại API lấy danh sách sp
      getFoodList();
    })
    .catch((err) => {
      console.log(err);
    });
};

document.querySelector("#btnCapNhat").onclick = () => {
  updateFood(foodIdEdit);
};
