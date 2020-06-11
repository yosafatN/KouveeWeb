import Vue from 'vue'
import Router from 'vue-router'

const HomePagePegawaiLayout = () => import('../components/homePagePegawaiLayout.vue')
const HomePageLayout = () => import('../components/homePageLayout.vue')
const DashboardAdminLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/dashboardAdminLayout.vue')
const DashboardCsLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/menuCS/dashboardCS.vue')
const DashboardKasirLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/menuKasir/dashboardCashier.vue')
const MenuLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/menu.vue')
const PengelolaanLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/pengelolaan.vue')
function loadHomePage(view){
    return () => import(`../components/homePageContents/${view}.vue`)
}
function loadAdminPage(view){
    return () => import(`../components/Admin/${view}.vue`)
}

const routes = [
{
    path: '/',
    component: HomePageLayout,
    children: [
        {
            path: '/',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/customer/homeCustomer.vue'),
        },
        {
            path: '/aboutUs',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/customer/tentangKami.vue'),
        },
        {
            path: '/layanan',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/customer/layanan.vue'),
        },
        {
            path: '/produk',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/customer/produk.vue'),
        }
    ]
},
{
    path: '/pegawai',
    component: HomePagePegawaiLayout,
    children: [
        {
            path: '/pegawai',
            name: 'home',
            component: loadHomePage('home')
        },
        {
            path: '/pegawai/signDual',
            name: 'signDual',
            component: loadHomePage('signDual')
        },
        {
            path: '/pegawai/loginCs',
            name: 'loginCs',
            component: loadHomePage('loginCs')
        },
        {
            path: '/pegawai/loginKasir',
            name: 'loginKasir',
            component: loadHomePage('loginKasir')
        }
    ]
},
{
    path: '/Admin',
    component: DashboardAdminLayout, 
    children: [
        {
            path: '/Admin/menu',
            component: MenuLayout,
        },
        {
            path: '/Admin/pengelolaan',
            component: PengelolaanLayout,
        },
        {
            path: '/Admin/Transaksi',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/menuTransaksi.vue'),
        },
        {
            path: '/Admin/transaksi/CS',
            component: () => import('../components/Admin/transaksi.vue'),
        },
        {
            path: '/Admin/transaksi/tambah',
            component: () => import('../components/Admin/transaksi_tambah.vue'),
        },
        {
            path: '/Admin/transaksi/penjualan',
            component: () => import('../components/Admin/transaksiPenjualan.vue'),
        },
        {
            path: '/Admin/transaksi/layanan',
            component: () => import('../components/Admin/transaksiLayanan.vue'),
        },
        {
            path: '/Admin/transaksi/Penjualan/keranjang',
            component: () => import('../components/Admin/keranjangPenjualan.vue'),
        },
        {
            path: '/Admin/transaksi/layanan/keranjang',
            component: () => import('../components/Admin/keranjangLayanan.vue'),
        },
        { 
            path: '/Admin/pengelolaan/jenisLayanan',            
            name: 'jenisLayananController', 
            component: loadAdminPage('jenisLayananController') 
        },
        { 
            path: '/Admin/pengelolaan/rolePegawai',            
            name: 'rolePegawaiController', 
            component: loadAdminPage('rolePegawaiController') 
        },
        { 
            path: '/Admin/pengelolaan/jenisHewan',            
            name: 'jenisHewanController', 
            component: loadAdminPage('jenisHewanController')
        },
        { 
            path: '/Admin/pengelolaan/ukuranHewan',            
            name: 'ukuranHewanController', 
            component: loadAdminPage('ukuranHewanController')
        },
        { 
            path: '/Admin/pengelolaan/produk',            
            name: 'produkController', 
            component: loadAdminPage('produkController')
        },
        { 
            path: '/Admin/pengelolaan/pegawai',            
            name: 'pegawaiController', 
            component: loadAdminPage('pegawaiController')
        },
        { 
            path: '/Admin/pengelolaan/supplier',            
            name: 'supplierController', 
            component: loadAdminPage('supplierController')
        },
        { 
            path: '/Admin/pengelolaan/layanan',            
            name: 'layananController', 
            component: loadAdminPage('layananController')
        },
        { 
            path: '/Admin/pengelolaan/member',            
            name: 'memberController', 
            component: loadAdminPage('memberController')
        },
        { 
            path: '/Admin/pengelolaan/hewan',            
            name: 'hewanController', 
            component: loadAdminPage('hewanController')
        },
        {
            path: '/Admin/pembayaran',
            component: () => import('../components/Admin/pembayaran.vue'),
        },
        {
            path: '/Admin/pembayaran/produk',
            component: () => import('../components/Admin/pembayaranProduk.vue'),
        },
        {
            path: '/Admin/pembayaran/layanan',
            component: () => import('../components/Admin/pembayaranLayanan.vue'),
        },
        {
            path: '/Admin/pembayaran/bayar',
            component: () => import('../components/Admin/bayar.vue'),
        },
        {
            path: '/Admin/pengadaan',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/pengadaan.vue')
        },
        {
            path: '/Admin/pengadaan/tambah',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/pengadaan_tambah.vue')
        },
        {
            path: '/Admin/pengadaan/tambah/produk',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/pengadaan_produk.vue')
        },
        {
            path: '/Admin/pengadaan/tambah/keranjang',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/pengadaan_keranjang.vue')
        },
        {
            path: '/Admin/log',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/menuLog.vue')
        },
        {
            path: '/Admin/log/supplier',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/log/logSupplier.vue')
        },
        {
            path: '/Admin/log/hewan',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/log/logHewan.vue')
        },
        {
            path: '/Admin/log/ukuranHewan',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/log/logUkuranHewan.vue')
        },
        {
            path: '/Admin/log/jenisHewan',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/log/logJenisHewan.vue')
        },
        {
            path: '/Admin/log/jenisLayanan',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/log/logJenisLayanan.vue')
        },
        {
            path: '/Admin/log/kategoriProduk',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/log/logKategoriProduk.vue')
        },
        {
            path: '/Admin/log/produk',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/log/logProduk.vue')
        },
        {
            path: '/Admin/log/layanan',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/log/logLayanan.vue')
        },
        {
            path: '/Admin/log/rolePegawai',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/log/logRolePegawai.vue')
        },
        {
            path: '/Admin/log/pegawai',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/log/logPegawai.vue')
        },
        {
            path: '/Admin/log/transaksiLayanan',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/log/logTransaksiLayanan.vue')
        },
        {
            path: '/Admin/log/transaksiProduk',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/log/logTransaksiProduk.vue')
        },
        {
            path: '/Admin/log/member',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/log/logMember.vue')
        },
        {
            path: '/Admin/pelaporan',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/pelaporan.vue')
        },
        {
            path: '/Admin/pengelolaan/transaksiLayanan',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/pengelolaanTransakasiLayanan.vue')
        },
        {
            path: '/Admin/pengelolaan/transaksiPenjualan',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/pengelolaanTransakasiPenjualan.vue')
        },
        {
            path: '/Admin/pengelolaan/kategoriProduk',
            component: () => import( /* webpackChunkName: "dashboard" */ '../components/Admin/kategoriProduk.vue')
        }
        
    ] 
},
{
    path: '/dashboardCS',
    component: DashboardCsLayout, 
    children: [
        {
            path: '/CS',
            component: () => import('../components/menuCS/menuCS.vue'),
        },
        {
            path: '/CS/transaksi',
            component: () => import('../components/menuCS/transaksi/transaksi.vue'),
        },
        {
            path: '/CS/transaksi/tambah',
            component: () => import('../components/menuCS/transaksi/transaksi_tambah.vue'),
        },
        {
            path: '/CS/transaksi/produk',
            component: () => import('../components/menuCS/transaksi/transaksiPenjualan.vue'),
        },
        {
            path: '/CS/transaksi/layanan',
            component: () => import('../components/menuCS/transaksi/transaksiLayanan.vue'),
        },
        {
            path: '/CS/transaksi/produk/keranjang',
            component: () => import('../components/menuCS/transaksi/keranjangPenjualan.vue'),
        },
        {
            path: '/CS/transaksi/layanan/keranjang',
            component: () => import('../components/menuCS/transaksi/keranjangLayanan.vue'),
        },
        { 
            path: '/CS/member',            
            name: 'csMemberController', 
            component: () => import('../components/menuCS/csMember.vue'),
        },
    ]
},
{
    path: '/dashboardCS',
    component: DashboardKasirLayout, 
    children: [
        {
            path: '/Cashier',
            component: () => import('../components/menuKasir/transaksi.vue'),
        },
        {
            path: '/Cashier/produk',
            component: () => import('../components/menuKasir/pembayaranProduk.vue'),
        },
        {
            path: '/Cashier/layanan',
            component: () => import('../components/menuKasir/pembayaranLayanan.vue'),
        },
        {
            path: '/Cashier/bayar',
            component: () => import('../components/menuKasir/bayar.vue'),
        },
    ]
}
]

Vue.use(Router) 

const router = new Router({mode: 'history', routes: routes}) 
    
export default router