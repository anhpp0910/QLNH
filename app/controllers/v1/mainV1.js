import Food from "../../models/v1/Food.js";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// lấy thông tin từ user nhập trên form
const layThongTinMonAn = () => {
  // ES6
  const elements = $$("#foodForm input, #foodForm select, #foodForm textarea");
  let food = {};
  elements.forEach((element) => {
    const { name, value } = element;
    food[name] = value;
  });
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

$("#btnThemMon").onclick = () => {
  const food = layThongTinMonAn();
  $("#imgMonAn").src = food.hinhAnh;
  $("#spMa").innerHTML = food.maMon;
  $("#spTenMon").innerHTML = food.tenMon;
  $("#spLoaiMon").innerHTML = food.mapLoaiMon();
  $("#spGia").innerHTML = food.giaMon;
  $("#spKM").innerHTML = food.khuyenMai;
  $("#spGiaKM").innerHTML = food.giaKM();
  $("#spTT").innerHTML = food.mapTinhTrang();
  $("#pMoTa").innerHTML = food.moTa;
};
