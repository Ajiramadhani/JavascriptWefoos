var base_url = "https://wefoosauthentic.com/";
var UIController = (function () {
	var DOMString = {
		btnAddCart: ".add-to-cart-link",
		btnAddCartDetail: ".add-cart",
		loading: ".image-loading",
		txtTotalBelanja: ".cart-amunt",
		txtJumlahBelanja: ".product-count",
		btnRegister: ".btn-register",
		modalLogin: "#modalLogin",
		modalRegister: "#modalRegister",
		modalLupaPassword: "#modalLupaPassword",
		modalVerifikasiToken: "#modalVerifikasiToken",
		modalResetPassword: "#modalResetPassword",
		btnLogin: ".btn-login",
		btnCloseModal: ".close",
		buttonLupaPassword: ".btn-lupapassword",
		btnVerifikasiToken: ".btn-verifikasi",
		login: ".login",
		register: ".register",
		lupaPassword: ".lupaPassword",
		verifikasitoken: ".verifikasitoken",
		resetPassword: ".resetpassword",
		errorEmail: "#errorEmail",
		errorPassword: "#errorPassword",
		txtEmail: "#txtEmail",
		txtPassword: "#txtPassword",
		txtNamaRegister: "#txtNamaRegister",
		txtNohpRegister: "#txtNohpRegister",
		txtEmailRegister: "#txtEmailRegister",
		txtPasswordRegister: "#txtPasswordRegister",
		txtRePasswordRegister: "#txtPassword2Register",
		txtEmailLupaPassword: "#txtEmailLupaPassword",
		errorNamaRegister: "#errorNamaRegister",
		errorNohpRegister: "#errorNohpRegister",
		errorEmailRegister: "#errorEmailRegister",
		errorPasswordRegister: "#errorPasswordRegister",
		errorRePasswordRegister: "#errorRePasswordRegister",
		errorEmailLupaPassword: "#errorEmailLupaPassword",
		txtEmailVerifikasi: "#txtEmailToken",
		txtToken: "#txtToken",
		errorEmailVerifikasi: "#errorEmailVerifikasi",
		errorToken: "#errorToken",
		labelEmail: "#labelemail",
		txtPasswordReset: "#txtPasswordReset",
		txtRePasswordReset: "#txtRePasswordReset",
		errorPasswordReset: "#errorTxtPasswordReset",
		errorRePasswordReset: "#errorTxtRePasswordReset",
		modalBody: ".modal-body",
		cartMinus: ".minus",
		dataCart: "#data-cart",
		txtCartTotal: "#cart-total",
		cmbLayanan: "#layanan",
		txtTotalOngkir: "#total-ongkir",
		txtTotalOngkirTabel: ".total-ongkir",
		txtTotal: ".total",
		txtJumlahBeli: ".qty",
	};
	return {
		getDOM: function () {
			return DOMString;
		},
		tampilTotalBelanja: function (total) {
			$(DOMString.txtTotalBelanja).text(total);
		},
		tampilJumlahBarang: function (jumlah) {
			$(DOMString.txtJumlahBelanja).text(jumlah);
		},
		closeModal: function (dom) {
			$(dom + " " + DOMString.btnCloseModal).click();
		},
		tampilAlert: function (type, text) {
			$(DOMString.modalBody).prepend(
				'<div class="alert ' +
				type +
				' alert-dismissible" role="alert">' +
				text +
				'<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
				'<span aria-hidden="true">&times;</span>' +
				"</button>" +
				"</div>"
			);
		},
		closeAlert: function () {
			$(".alert").alert("close");
		},
		tampilSweetAlert: function (namabarang, tipe, text) {
			Swal.fire({
				icon: tipe,
				title: namabarang,
				text: text,
				showConfirmButton: false,
				timer: 1000,
			});
		},
		tampilOngkir: function (total) {
			$(DOMString.txtTotalOngkir).val(this.formatRupiah(total));
		},
		tampilOngkirTabel: function (total) {
			$(DOMString.txtTotalOngkirTabel).text("Rp. " + this.formatRupiah(total));
		},
		tampilTotalBayar: function (total) {
			$(DOMString.txtTotal).text("Rp. " + this.formatRupiah(total));
		},
		formatRupiah: function (angka) {
			return parseFloat(angka)
				.toFixed(2)
				.replace(/\d(?=(\d{3})+\.)/g, "$&,")
				.replace(/\,/g, ".")
				.slice(0, -3);
		},

		// halaman pemesanan
		buatTabelPemesanan: function (data, fnTotal, fnJumlah) {
			var baris, i, foto, nama, idBarang, url, urlFoto, harga, id;
			if (data.length == 0) {
				baris +=
					'<tr class="cart_item">' +
					'<td colspan="6"><b>Keranjang Masih Kosong</b></td>';
			} else {
				for (i = 0; i < data.length; i++) {
					id = data[i].id;
					foto = data[i].foto;
					nama = this.limitKalimat(data[i].nama, 25);
					idBarang = data[i].id_barang;
					harga = this.formatRupiah(data[i].total_harga);
					jumlah = data[i].jumlah;
					subtotal = this.formatRupiah(data[i].subtotal);
					url = base_url + "DetailProduk?id=" + idBarang;
					urlFoto = base_url + "foto_produk/" + foto;
					baris +=
						'<tr class="cart_item">' +
						'<td class="product-remove"> <p><a title="remove this item" class ="remove" href="javascript:;" data-id="' +
						id +
						'">X</a></p></td>' +
						'<td class="product-thumbnail"> <img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src="' +
						urlFoto +
						'"> </a></td>' +
						'<td class="product-name"><p>' +
						nama +
						"</p></td>" +
						'<td class="product-price"> <span class="amount">' +
						harga +
						"</span></td>" +
						'<td class="product-quantity"><div class="quantity buttons_added"><input type="button" class="minus" value="-" data-id="' +
						id +
						'"' +
						"data-harga=" +
						harga +
						'><input type="text" size="4" class="input-text qty text ml-1 mr-1" title="Qty" value="' +
						jumlah +
						'" min="0" step="1" readonly><input type="button" class="plus" value="+" data-id=' +
						id +
						" data-harga=" +
						harga +
						"></div></td>" +
						'<td class="product-subtotal"><span class="amount"><b>' +
						subtotal +
						"</b></span></td>" +
						"</tr>";
				}

				baris +=
					'<tr class="cart-item">' +
					'<td class ="product-name" colspan="4">Total</td>' +
					'<td class = "product-name" id="cart-total" colspan="2"><b></b></td>' +
					"</tr>";

				baris +=
					"<tr>" +
					'<td class="actions" colspan="6">' +
					'<div class="coupon">' +
					'<a href="' +
					base_url +
					"Checkout" +
					'" class="checkout-button">Pembayaran</a>' +
					"</div>" +
					//'<input type="submit" value="Checkout" name="proceed" class="checkout-button button alt wc-forward">'+
					"</td>" +
					"</tr>";
			}
			$(DOMString.dataCart).html(baris);
			fnTotal;
			fnJumlah;
		},

		tampilTotalBelanjaKeranjang: function (total) {
			$(DOMString.txtCartTotal).text(total);
		},
		limitKalimat: function (text, limit) {
			return text.slice(0, limit) + " ...";
		},
		// halaman ceckout
		tampilKota: function (data) {
			var html;

			if (data.length == 0) {
				html += '<option value="">--Kota/Kabupaten--</option>';
			} else {
				for (var i = 0; i < data.length; i++) {
					html +=
						'<option value="' +
						data[i].id_kota +
						'" >' +
						data[i].nama_kota +
						"</option>";
				}
			}
			$(".kota").html(html);
		},
		tampilLayananKurir: function (data) {
			var html;
			html += "<option>--Layanan--</option>";
			for (var i = 0; i < data.length; i++) {
				html +=
					'<option value="' + data[i].id + '">' + data[i].layanan + "</option>";
			}
			$(DOMString.cmbLayanan).html(html);
			$(DOMString.cmbLayanan).prop("selectedIndex", 0);
		},
		tampilEmailVerifikasi: function (email) {
			$(DOMString.txtEmailVerifikasi).val(email);
		},
		tampilError: function (dom, tek) {
			$(dom).text(tek);
		},
		bersihError: function (dom) {
			$(dom).text("");
		},
		bersihKolom: function (dom) {
			$(dom).val("");
		},
	};
})();

var Controller = (function (uiCtr) {
	var email, dom, nofaktur, status;
	email = $("body").attr("data-email");

	var setupEventListener = function () {
		dom = uiCtr.getDOM();

		$(window).load(function () {
			// Animate loader off screen
			$(dom.loading).fadeOut("slow");
		});
		if (email != "") {
			getNomorFaktur();
			getJumlahBelanja();
			getTotalBelanja();
		}

		$(dom.buttonLupaPassword).on("click", function () {
			uiCtr.closeModal(dom.modalLogin);
		});

		$(dom.btnVerifikasiToken).on("click", function () {
			uiCtr.closeModal(dom.modalLupaPassword);
		});

		$(dom.btnRegister).on("click", function () {
			uiCtr.closeModal(dom.modalLogin);
		});

		$(dom.btnLogin).on("click", function () {
			uiCtr.closeModal(dom.modalRegister);
			uiCtr.closeModal(dom.modalLupaPassword);
			uiCtr.closeModal(dom.modalVerifikasiToken);
			uiCtr.closeModal(dom.modalResetPassword);
		});

		$(dom.login).on("click", function () {
			login();
		});

		$(dom.txtEmail).on("change", function () {
			uiCtr.bersihError(dom.errorEmail);
			uiCtr.closeAlert();
		});

		$(dom.txtPassword).on("change", function () {
			uiCtr.bersihError(dom.errorPassword);
			uiCtr.closeAlert();
		});

		$(dom.txtNamaRegister).on("change", function () {
			uiCtr.bersihError(dom.errorNamaRegister);
		});

		$(dom.txtNohpRegister).on("change", function () {
			uiCtr.bersihError(dom.errorNohpRegister);
		});

		$(dom.txtEmailRegister).on("change", function () {
			uiCtr.bersihError(dom.errorEmailRegister);
		});

		$(dom.txtPasswordRegister).on("change", function () {
			uiCtr.bersihError(dom.errorPasswordRegister);
		});

		$(dom.txtRePasswordRegister).on("change", function () {
			uiCtr.bersihError(dom.errorRePasswordRegister);
		});

		$(dom.txtEmailLupaPassword).on("change", function () {
			uiCtr.bersihError(dom.errorEmailLupaPassword);
			uiCtr.closeAlert();
		});

		$(dom.modalLogin + " " + dom.btnCloseModal).on("click", function () {
			uiCtr.bersihError(dom.errorEmail);
			uiCtr.bersihError(dom.errorPassword);
			uiCtr.closeAlert();
			uiCtr.bersihKolom(dom.txtEmail);
			uiCtr.bersihKolom(dom.txtPassword);
		});

		$(dom.modalLupaPassword + " " + dom.btnCloseModal).on("click", function () {
			uiCtr.bersihError(dom.errorEmailLupaPassword);
			uiCtr.closeAlert();
			uiCtr.bersihKolom(dom.txtEmailLupaPassword);
		});

		$(dom.modalRegister + " " + dom.btnCloseModal).on("click", function () {
			uiCtr.bersihError(dom.errorNamaRegister);
			uiCtr.bersihError(dom.errorNohpRegister);
			uiCtr.bersihError(dom.errorEmailRegister);
			uiCtr.bersihError(dom.errorPasswordRegister);
			uiCtr.bersihError(dom.errorRePasswordRegister);
			uiCtr.bersihKolom(dom.txtEmailRegister);
			uiCtr.bersihKolom(dom.txtPasswordRegister);
			uiCtr.bersihKolom(dom.txtRePasswordRegister);
		});

		$(dom.modalVerifikasiToken + " " + dom.btnCloseModal).on(
			"click",
			function () {
				uiCtr.bersihError(dom.errorEmailVerifikasi);
				uiCtr.bersihError(dom.errorToken);
				uiCtr.bersihKolom(dom.txtEmailVerifikasi);
				uiCtr.bersihKolom(dom.txtToken);
				uiCtr.closeAlert();
			}
		);

		$(dom.txtEmailVerifikasi).on("change", function () {
			uiCtr.bersihError(dom.errorEmailVerifikasi);
			uiCtr.closeAlert();
		});

		$(dom.txtToken).on("change", function () {
			uiCtr.bersihError(dom.errorToken);
			uiCtr.closeAlert();
		});

		$(dom.txtPasswordReset).on("change", function () {
			uiCtr.bersihError(dom.errorPasswordReset);
		});

		$(dom.txtRePasswordReset).on("change", function () {
			uiCtr.bersihError(dom.errorRePasswordReset);
		});
		$(dom.register).on("click", function () {
			register();
		});

		$(dom.lupaPassword).on("click", function () {
			lupaPassword();
		});

		$(dom.verifikasitoken).on("click", function () {
			verifikasiToken();
		});

		$(dom.resetPassword).on("click", function () {
			resetPassword();
		});

		$(document).on("show.bs.modal", dom.modalVerifikasiToken, function (e) {
			$(dom.labelEmail).show();
			$(dom.errorEmailVerifikasi).show();
			$(dom.txtEmailVerifikasi).show();
			getEmailReset();
		});

		$(dom.btnAddCartDetail).on("click", function () {
			var jumlahbarang;
			if ($(dom.txtJumlahBeli).val() == undefined) {
				jumlahbarang = 1;
			} else {
				jumlahbarang = $(dom.txtJumlahBeli).val();
			}
			if (email) {
				data = {
					namabarang: $(this).attr("data-nama"),
					idbarang: $(this).attr("data-idbarang"),
					jumlahbarang: jumlahbarang,
				};
				insertBelanja(data);
			} else {
				uiCtr.closeAlert();
				$(dom.modalLogin).modal("show");
			}
		});

		$("#multiple-carousel").on("click", dom.btnAddCart, function () {
			if (email) {
				data = {
					namabarang: $(this).attr("data-nama"),
					idbarang: $(this).attr("data-idbarang"),
					hargabarang: $(this).attr("data-harga"),
					jumlahbarang: 1,
				};
				insertBelanja(data);
			} else {
				uiCtr.closeAlert();
				$(dom.modalLogin).modal("show");
			}
		});

		// fungsi ketika menekan enter waktu modal login tampil
		$(dom.modalLogin).keypress(function (event) {
			var keycode = event.keyCode ? event.keyCode : event.which;
			if (keycode === 13) {
				login();
			}
		});

		// fungsi ketika menekan enter waktu modal register tampil
		$(dom.modalRegister).keypress(function (event) {
			var keycode = event.keyCode ? event.keyCode : event.which;
			if (keycode === 13) {
				register();
			}
		});

		// fungsi ketika menekan enter waktu modal verifikasi token tampil
		$(dom.modalVerifikasiToken).keypress(function (event) {
			var keycode = event.keyCode ? event.keyCode : event.which;
			if (keycode === 13) {
				verifikasiToken();
			}
		});

		// fungsi ketika menekan enter waktu modal reset password tampil
		$(dom.modalResetPassword).keypress(function (event) {
			var keycode = event.keyCode ? event.keyCode : event.which;
			if (keycode === 13) {}
		});

		// fungsi ketika menekan enter waktu modal lupa password tampil
		$(dom.modalLupaPassword).keypress(function (event) {
			var keycode = event.keyCode ? event.keyCode : event.which;
			if (keycode === 13) {
				lupaPassword();
			}
		});

		$(dom.modalLogin).keypress(function (keycode) {
			var keycode = event.keyCode ? event.keyCode : event.which;
			if (keycode === 27) {
				resetPassword();
			}
		});

		// ketika tombol - ditekan pada keranjang
		$(dom.dataCart).on("click", ".minus", function () {
			var id = $(this).attr("data-id");
			var harga = $(this).attr("data-harga").replace(/\./g, "");
			$.ajax({
				url: base_url + "Cart/plusminBelanja",
				data: {
					id: id,
					status: "kurang",
					harga: harga,
				},
				type: "post",
				success: function (data) {
					getAllPemesanan();
					$("#load").hide();
				},
				beforeSend: function () {
					$("#load").show();
				},
			});
		});

		// ketika tombol + ditekan pada keranjang
		$(dom.dataCart).on("click", ".plus", function () {
			var id = $(this).attr("data-id");
			var harga = $(this).attr("data-harga").replace(/\./g, "");
			$.ajax({
				url: base_url + "Cart/plusminBelanja",
				data: {
					id: id,
					status: "tambah",
					harga: harga,
				},
				type: "post",
				success: function (data) {
					if (data != "gagal") {
						getAllPemesanan();
						$("#load").hide();
					} else {
						uiCtr.tampilSweetAlert("Gagal", "error", "Stok tidak mencukupi");
						$("#load").hide();
					}
				},
				beforeSend: function () {
					$("#load").show();
				},
			});
		});

		$(dom.dataCart).on("click", ".remove", function () {
			var id = $(this).attr("data-id");
			deleteItemKeranjang(id);
		});

		$(".provinsi").on("change", function () {
			var id = $(this).find(":selected").val();
			getKota(id);
		});

		$("#kurir").on("change", function () {
			var kurir = $(this).find(":selected").val();
			getLayanan(kurir);
		});

		$(dom.cmbLayanan).on("change", function () {
			getOngkir();
		});

		function login() {
			var form_data = new FormData($("#form")[0]);
			$.ajax({
				type: "POST",
				data: form_data,
				url: base_url + "Authentikasi",
				processData: false,
				contentType: false,
				dataType: "JSON",
				success: function (data) {
					if (data.pesan == "Berhasil") {
						$(location).attr("href", base_url + "Home");
					} else if (data.pesan == "Gagal") {
						uiCtr.tampilError(dom.errorEmail, data.errorEmail);
						uiCtr.tampilError(dom.errorPassword, data.errorPassword);
					} else {
						uiCtr.closeAlert();
						uiCtr.tampilAlert("alert-danger", "Username atau Password Salah");
					}
				},
			});
		}

		function register() {
			var form_data = new FormData($("#formRegister")[0]);
			$.ajax({
				type: "POST",
				data: form_data,
				url: base_url + "Authentikasi/register",
				processData: false,
				contentType: false,
				dataType: "JSON",
				success: function (data) {
					if (data.pesan == "Berhasil") {
						$(location).attr("href", base_url + "Home");
					} else if (data.pesan == "Gagal") {
						uiCtr.tampilError(dom.errorNamaRegister, data.errorNama);
						uiCtr.tampilError(dom.errorNohpRegister, data.errorNohp);
						uiCtr.tampilError(dom.errorEmailRegister, data.errorEmail);
						uiCtr.tampilError(dom.errorPasswordRegister, data.errorPassword);
						uiCtr.tampilError(
							dom.errorRePasswordRegister,
							data.errorRePassword
						);
					}
				},
			});
		}

		function lupaPassword() {
			var form_data = new FormData($("#formLupaPassword")[0]);
			$.ajax({
				type: "POST",
				data: form_data,
				url: base_url + "Authentikasi/lupaPassword",
				processData: false,
				contentType: false,
				dataType: "JSON",
				beforeSend: function () {
					$("#load-image").show();
				},
				success: function (data) {
					$("#load-image").hide();
					if (data.pesan == "Berhasil") {
						uiCtr.closeAlert();
						uiCtr.tampilAlert("alert-success", "Periksa email anda!");
					} else if (data.pesan == "Gagal") {
						uiCtr.tampilError(dom.errorEmailLupaPassword, data.errorEmail);
					}
				},
			});
		}

		function verifikasiToken() {
			var form_data = new FormData($("#formVerifikasiToken")[0]);
			$.ajax({
				type: "POST",
				data: form_data,
				url: base_url + "Authentikasi/verifikasiToken",
				processData: false,
				contentType: false,
				dataType: "JSON",
				success: function (data) {
					if (data.pesan == "Berhasil") {
						$(dom.modalResetPassword).modal("show");
						uiCtr.closeModal(dom.modalVerifikasiToken);
					} else if (data.pesan == "Gagal") {
						uiCtr.tampilError(dom.errorEmailVerifikasi, data.errorEmail);
						uiCtr.tampilError(dom.errorToken, data.errorToken);
					} else if (data.pesan == "Salah") {
						uiCtr.closeAlert();
						uiCtr.tampilAlert("alert-danger", "Email atau Token salah");
					} else if ((data.pesan = "Kadarluarsa")) {
						uiCtr.closeAlert();
						uiCtr.tampilAlert("alert-danger", "Token sudah kadarluarsa");
					}
				},
			});
		}

		function resetPassword() {
			var form_data = new FormData($("#formResetPassword")[0]);
			$.ajax({
				type: "POST",
				data: form_data,
				url: base_url + "Authentikasi/resetPassword",
				processData: false,
				contentType: false,
				dataType: "JSON",
				success: function (data) {
					if (data.pesan == "Gagal") {
						uiCtr.tampilError(dom.errorPasswordReset, data.errorPassword);
						uiCtr.tampilError(dom.errorRePasswordReset, data.errorRePassword);
					} else if ((data.pesan = "Berhasil")) {
						uiCtr.bersihKolom(dom.txtPasswordReset);
						uiCtr.bersihKolom(dom.txtRePasswordReset);
						uiCtr.closeModal(dom.modalResetPassword);
					}
				},
			});
		}

		function getEmailReset() {
			$.ajax({
				type: "POST",
				url: base_url + "Authentikasi/getEmailReset",
				success: function (data) {
					if (data != "") {
						uiCtr.tampilEmailVerifikasi(data);
						$(dom.labelEmail).hide();
						$(dom.txtEmailVerifikasi).hide();
						$(dom.errorEmailVerifikasi).hide();
					}
				},
			});
		}

		function insertBelanja(data) {
			var namabarang = data.namabarang;
			$.ajax({
				type: "POST",
				data: {
					idbarang: data.idbarang,
					jumlahbarang: data.jumlahbarang,
				},
				dataType: "JSON",
				url: base_url + "Home/addDataPemesanan",
				success: function (data) {
					if (data.pesan == "Berhasil") {
						getTotalBelanja();
						getJumlahBelanja();
						uiCtr.tampilSweetAlert(
							namabarang,
							"success",
							"berhasil ditambahkan ke keranjang"
						);
					} else if (data.pesan == "Gagal") {
						uiCtr.tampilSweetAlert("Gagal", "error", "Stok tidak mencukupi");
					}
				},
			});
		}

		function getTotalBelanja() {
			$.ajax({
				type: "POST",
				url: base_url + "Home/getTotal",
				success: function (data) {
					uiCtr.tampilTotalBelanja(data);
					if (location.pathname=="/Cart") {
					    getAllPemesanan();
				// 		uiCtr.tampilTotalBelanjaKeranjang(data);
					}
				},
				error: function () {
					$(dom.modalLogin).modal("show");
				},
			});
		}

		function getJumlahBelanja() {
			$.ajax({
				type: "POST",
				url: base_url + "Home/getJumlahBarang",
				success: function (data) {
					uiCtr.tampilJumlahBarang(data);
				},
			});
		}

		function getNomorFaktur() {
			$.ajax({
				type: "POST",
				dataType: "JSON",
				url: base_url + "Home/getNoFaktur",
				success: function (data) {
					if (email && data.status == 0) {
						getJumlahBelanja();
						getTotalBelanja();
					}
				},
			});
		}

		if (location.pathname=="/Cart") {
			getAllPemesanan();
		}

		function getAllPemesanan() {
			$.ajax({
				type: "post",
				url: base_url + "Cart/getAll",
				dataType: "JSON",
				success: function (data) {
					uiCtr.buatTabelPemesanan(data, getTotalBelanja(), getJumlahBelanja());
				},
			});
		}

		function deleteItemKeranjang(id) {
			$.ajax({
				type: "post",
				data: {
					id: id,
				},
				url: base_url + "Cart/deletePemesanan",
				success: function () {
					getAllPemesanan();
					getJumlahBelanja();
					getTotalBelanja();
				},
			});
		}

		function getKota(idprovinsi) {
			$.ajax({
				url: base_url + "Checkout/getKota",
				data: {
					id: idprovinsi,
				},
				type: "post",
				dataType: "JSON",
				success: function (data) {
					var newData = hapusDuplicateKota(data);
					uiCtr.tampilKota(newData);
				},
			});
		}

		function getOngkir() {
			var form_data = new FormData($("#checkout")[0]);
			$.ajax({
				url: base_url + "Checkout/getOngkir",
				data: form_data,
				type: "post",
				processData: false,
				contentType: false,
				success: function (data) {
					uiCtr.tampilOngkir(data);
					uiCtr.tampilOngkirTabel(data);
					getTotalPembayaran();
				},
			});
		}

		function getLayanan(kurir) {
			var kota = $(".kota").find(":selected").val();
			$.ajax({
				url: base_url + "Checkout/getKurir",
				data: {
					kurir: kurir,
					tujuan: kota,
				},
				type: "post",
				dataType: "json",
				success: function (data) {
					uiCtr.tampilLayananKurir(data);
				},
			});
		}

		function getTotalPembayaran() {
			var ongkir = parseFloat($(dom.txtTotalOngkir).val().replace(/\./g, ""));
			var subtotal = parseFloat(
				$(dom.txtTotalBelanja).text().replace(/\./g, "")
			);
			var total = subtotal + ongkir;
			uiCtr.tampilTotalBayar(total);
		}

		// waktu skrip ini dibuat api raja ongkir masih ada bug, nama kota yang ganda
		function hapusDuplicateKota(data) {
			var namaKota = Object.values(
				data.reduce(
					(acc, cur) =>
					Object.assign(acc, {
						[cur.nama_kota]: cur,
					}), {}
				)
			);
			var idKota = Object.values(
				namaKota.reduce(
					(acc, cur) =>
					Object.assign(acc, {
						[cur.id_kota]: cur,
					}), {}
				)
			);
			return idKota;
		}
	};

	return {
		init: function () {
			setupEventListener();
		},
	};
})(UIController);
Controller.init();
