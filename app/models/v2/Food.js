class Food {
  constructor(
    maMon,
    tenMon,
    loaiMon,
    giaMon,
    khuyenMai,
    tinhTrang,
    hinhAnh,
    moTa
  ) {
    (this.maMon = maMon),
      (this.tenMon = tenMon),
      (this.loaiMon = loaiMon),
      (this.giaMon = giaMon),
      (this.khuyenMai = khuyenMai),
      (this.tinhTrang = tinhTrang),
      (this.hinhAnh = hinhAnh),
      (this.moTa = moTa);
  }
  mapLoaiMon = () => {
    return this.loaiMon === "loai1" ? "Loại Chay" : "Loại Mặn";
  };
  mapTinhTrang = () => {
    return this.tinhTrang === "0" ? "Hết" : "Còn";
  };
  giaKM = () => {
    return this.giaMon * (1 - (this.khuyenMai * 1) / 100);
  };
}

export default Food;
