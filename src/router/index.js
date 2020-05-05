import Vue from 'vue'
import Router from 'vue-router'

const DashboardUserLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/dashboardUserLayout.vue')
const HomePageLayout = () => import('../components/homePageLayout.vue')
const DashboardAdminLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/dashboardAdminLayout.vue')
const DashboardCsLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/dashboardCsLayout.vue')
const DashboardKasirLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/dashboardKasirLayout.vue')
const MenuLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/menu/menu.vue')
const MenuCSLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/menuCS/menuCS.vue')
const MenuKasirLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/menuKasir/menuKasir.vue')
const PengelolaanLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/menu/pengelolaan.vue')
const CsPengelolaanLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/menuCS/csPengelolaan.vue')
const CsPelaporanLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/menuCS/csPelaporan.vue')
const KasirPengelolaanLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/menuKasir/kasirPengelolaan.vue')
const KasirPelaporanLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/menuKasir/kasirPelaporan.vue')
const AdminPengadaanLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/menu/pengadaan.vue')
const AdminPelaporanLayout = () => import( /* webpackChunkName: "dashboard" */ '../components/menu/pelaporan.vue')

function loadView(view) {
    return () => import( /* webpackChunkName: "view[request]" */ `../components/dashboardUserContents/${view}.vue`)
}

function loadHomePage(view){
    return () => import(`../components/homePageContents/${view}.vue`)
}

function loadAdminPage(view){
    return () => import(`../components/dashboardAdminContents/${view}.vue`)
}

function loadCsPage(view){
    return () => import(`../components/dashboardCsContents/${view}.vue`)
}

function loadKasirPage(view){
    return () => import(`../components/dashboardKasirContents/${view}.vue`)
}

const routes = [
{
    path: '/',
    component: HomePageLayout,
    children: [
        {
            path: '/',
            name: 'home',
            component: loadHomePage('home')
        }, 
        {
            path: '/aboutUs',
            name: 'aboutUs',
            component: loadHomePage('aboutUsLayout')
        }, 
        {
            path: '/signDual',
            name: 'signDual',
            component: loadHomePage('signDual')
        },
        {
            path: '/loginCs',
            name: 'loginCs',
            component: loadHomePage('loginCs')
        },
        {
            path: '/loginKasir',
            name: 'loginKasir',
            component: loadHomePage('loginKasir')
        }
    ]
},
{
    path: '/menu',
    component: MenuLayout,
},
{
    path: '/pengelolaan',
    component: PengelolaanLayout,
},
{
    path: '/transaksi',
    component: () => import('../components/transaksi/transaksi.vue'),
},
{
    path: '/transaksi/tambah',
    component: () => import('../components/transaksi/transaksi_tambah.vue'),
},
{
    path: '/transaksi/produk',
    component: () => import('../components/transaksi/transaksiPenjualan.vue'),
},
{
    path: '/transaksi/layanan',
    component: () => import('../components/transaksi/transaksiLayanan.vue'),
},
{
    path: '/transaksi/produk/keranjang',
    component: () => import('../components/transaksi/keranjangPenjualan.vue'),
},
{
    path: '/transaksi/layanan/keranjang',
    component: () => import('../components/transaksi/keranjangLayanan.vue'),
},
{
    path: '/pengadaan',
    component: AdminPengadaanLayout,
},
{
    path: '/pelaporan',
    component: AdminPelaporanLayout,
},
{
    path: '/menuCS',
    component: MenuCSLayout,
},
{
    path: '/csPengelolaan',
    component: CsPengelolaanLayout,
},
{
    path: '/csPelaporan',
    component: CsPelaporanLayout,
},

{
    path: '/menuKasir',
    component: MenuKasirLayout,
},

{
    path: '/kasirPengelolaan',
    component: KasirPengelolaanLayout,
},
{
    path: '/kasirPelaporan',
    component: KasirPelaporanLayout,
},
{
    path: '/dashboardUser', 
    component: DashboardUserLayout, 
    children: [ 
        { 
            path: '/dashboardUser',            
            name: 'borrowBookController', 
            component: loadView('borrowBookController') 
        },
        { 
            path: '/dashboardUser/borrowList',            
            name: 'borrowListController', 
            component: loadView('borrowListController') 
        },
        { 
            path: '/dashboardUser/requestBook',            
            name: 'requestBookController', 
            component: loadView('requestBookController') 
        },
        { 
            path: '/dashboardUser/bookReview',            
            name: 'reviewController', 
            component: loadView('reviewController') 
        },
        { 
            path: '/dashboardUser/userAccount',            
            name: 'accountController', 
            component: loadView('accountController') 
        },
        { 
            path: '/dashboardUser/userAccount/userAccountEdit',            
            name: 'accountEditController', 
            component: loadView('accountEditController') 
        },

    ] 
}, 
{
    path: '/dashboardAdmin', 
    component: DashboardAdminLayout, 
    children: [ 
        { 
            path: '/dashboardAdmin/jenisLayanan',            
            name: 'jenisLayananController', 
            component: loadAdminPage('jenisLayananController') 
        },
        { 
            path: '/dashboardAdmin/rolePegawai',            
            name: 'rolePegawaiController', 
            component: loadAdminPage('rolePegawaiController') 
        },
        { 
            path: '/dashboardAdmin/userWishList',            
            name: 'userWishlistController', 
            component: loadAdminPage('userWishlistController') 
        },
        { 
            path: '/dashboardAdmin/userReview',            
            name: 'userReviewController', 
            component: loadAdminPage('userReviewController')
        },
        { 
            path: '/dashboardAdmin/userJenisHewan',            
            name: 'jenisHewanController', 
            component: loadAdminPage('jenisHewanController')
        },
        { 
            path: '/dashboardAdmin/userUkuranHewan',            
            name: 'ukuranHewanController', 
            component: loadAdminPage('ukuranHewanController')
        },
        { 
            path: '/dashboardAdmin/produk',            
            name: 'produkController', 
            component: loadAdminPage('produkController')
        },
        { 
            path: '/dashboardAdmin/pegawai',            
            name: 'pegawaiController', 
            component: loadAdminPage('pegawaiController')
        },
        { 
            path: '/dashboardAdmin/supplier',            
            name: 'supplierController', 
            component: loadAdminPage('supplierController')
        },
        { 
            path: '/dashboardAdmin/layanan',            
            name: 'layananController', 
            component: loadAdminPage('layananController')
        },
        { 
            path: '/dashboardAdmin/member',            
            name: 'memberController', 
            component: loadAdminPage('memberController')
        },
        { 
            path: '/dashboardAdmin/hewan',            
            name: 'hewanController', 
            component: loadAdminPage('hewanController')
        },
        { 
            path: '/dashboardAdmin/pemesanan',            
            name: 'pemesananController', 
            component: loadAdminPage('pemesananController')
        },
        { 
            path: '/dashboardAdmin/produkPemesanan',            
            name: 'produkPemesananController', 
            component: loadAdminPage('produkPemesananController')
        },
        { 
            path: '/dashboardAdmin/listLayanan',            
            name: 'listLayananController', 
            component: loadAdminPage('listLayananController')
        },
        
        { 
            path: '/dashboardAdmin/transaksiLayanan',            
            name: 'transaksiLayananController', 
            component: loadAdminPage('transaksiLayananController')
        },
        { 
            path: '/dashboardAdmin/adminKonfirmasiTransaksi',            
            name: 'adminKonfirmasiTransaksi', 
            component: loadAdminPage('adminKonfirmasiTransaksi')
        },
        { 
            path: '/dashboardAdmin/adminTransaksiController',            
            name: 'adminTransaksiController', 
            component: loadAdminPage('adminTransaksiController')
        },
        { 
            path: '/dashboardAdmin/adminAllLayanan',            
            name: 'adminAllLayanan', 
            component: loadAdminPage('adminAllLayanan')
        },
        { 
            path: '/dashboardAdmin/adminAllProduk',            
            name: 'adminAllProduk', 
            component: loadAdminPage('adminAllProduk')
        },
        { 
            path: '/dashboardAdmin/adminKeranjangProduk',            
            name: 'adminKeranjangProduk', 
            component: loadAdminPage('adminKeranjangProduk')
        },
        { 
            path: '/dashboardAdmin/adminKeranjangLayanan',            
            name: 'adminKeranjangLayanan', 
            component: loadAdminPage('adminKeranjangLayanan')
        },
        { 
            path: '/dashboardAdmin/adminLayananPelaporanController',            
            name: 'adminLayananPelaporanController', 
            component: loadAdminPage('adminLayananPelaporanController')
        },
        { 
            path: '/dashboardAdmin/adminProdukPelaporanController',            
            name: 'adminProdukPelaporanController', 
            component: loadAdminPage('adminProdukPelaporanController')
        },
        { 
            path: '/dashboardAdmin/adminTestingLayanan',            
            name: 'adminTestingLayanan', 
            component: loadAdminPage('adminTestingLayanan')
        },
        { 
            path: '/dashboardAdmin/adminPengelolaanTransaksi',            
            name: 'adminPengelolaanTransaksi', 
            component: loadAdminPage('adminPengelolaanTransaksi')
        },
    ] 
},
{
    path: '/dashboardCs', 
    component: DashboardCsLayout, 

    children: [ 
        { 
            path: '/dashboardCs/jenisHewan',            
            name: 'cSjenisHewanController', 
            component: loadCsPage('csJenisHewanController')
        },
        { 
            path: '/dashboardCs/produk',            
            name: 'csProdukController', 
            component: loadCsPage('csProdukController')
        },
        { 
            path: '/dashboardCs/ukuranHewan',            
            name: 'csUkuranHewanController', 
            component: loadCsPage('csUkuranHewanController')
        },
        { 
            path: '/dashboardCs/layanan',            
            name: 'csLayananController', 
            component: loadCsPage('csLayananController')
        },
        { 
            path: '/dashboardCs/member',            
            name: 'csMemberController', 
            component: loadCsPage('csMemberController')
        },
        { 
            path: '/dashboardCs/hewan',            
            name: 'csHewanController', 
            component: loadCsPage('csHewanController')
        },
        { 
            path: '/dashboardCs/csTransaksiController',            
            name: 'csTransaksiController', 
            component: loadCsPage('csTransaksiController')
        },
        { 
            path: '/dashboardCs/csLayananReport',            
            name: 'csLayananReport', 
            component: loadCsPage('csLayananReport')
        },
        { 
            path: '/dashboardCs/csLayananPelaporan',            
            name: 'csLayananPelaporan', 
            component: loadCsPage('csLayananPelaporan')
        },
        { 
            path: '/dashboardCs/csProdukPelaporan',            
            name: 'csProdukPelaporan', 
            component: loadCsPage('csProdukPelaporan')
        },

    ] 
},
{
    path: '/dashboardKasir', 
    component: DashboardKasirLayout, 
    children: [ 
        { 
            path: '/dashboardKasir/produk',            
            name: 'kasirProdukController', 
            component: loadKasirPage('kasirProdukController')
        },
        { 
            path: '/dashboardKasir/jenisHewan',            
            name: 'kasirJenisHewanController', 
            component: loadKasirPage('kasirJenisHewanController')
        },
        { 
            path: '/dashboardKasir/layanan',            
            name: 'kasirLayananController', 
            component: loadKasirPage('kasirLayananController')
        },
        { 
            path: '/dashboardKasir/ukuranHewan',            
            name: 'kasirUkuranHewanController', 
            component: loadKasirPage('kasirUkuranHewanController')
        },
        { 
            path: '/dashboardKasir/supplier',            
            name: 'kasirSupplierController', 
            component: loadKasirPage('kasirSupplierController')
        },
        { 
            path: '/dashboardKasir/kasirTransaksiController',            
            name: 'kasirTransaksiController', 
            component: loadKasirPage('kasirTransaksiController')
        },
        
        { 
            path: '/dashboardKasir/kasirLayananPelaporan',            
            name: 'kasirLayananPelaporan', 
            component: loadKasirPage('kasirLayananPelaporan')
        },
        
        { 
            path: '/dashboardKasir/kasirProdukPelaporan',            
            name: 'kasirProdukPelaporan', 
            component: loadKasirPage('kasirProdukPelaporan')
        },
       

    ] 
},  
]

Vue.use(Router) 

const router = new Router({mode: 'history', routes: routes}) 
    
export default router