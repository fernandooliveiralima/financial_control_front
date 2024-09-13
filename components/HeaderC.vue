<script setup lang="ts">
import {storeToRefs} from 'pinia'

import {useAuthStore} from '../stores/authStore/authStore'

const authStoreInstance = useAuthStore();
const {} = storeToRefs(authStoreInstance);

const mobileMenu = ref();
function toggleMenu() {
    mobileMenu.value = !mobileMenu.value;
    subItem1.value = false;
    megaItem1.value = false;
}

//sub menu 1
const subItem1 = ref();

function ToogleSub1() {
    subItem1.value = !subItem1.value;
}

//mega menu 1
const megaItem1 = ref();

function ToogleNega1() {
    megaItem1.value = !megaItem1.value;
}


</script>

<template>
    <div>

        <header class="header-area">
            <div class="containers">
                <div class="row">
                    <div class="col-12">
                        <nav class="navigation">
                            <a href="#" class="logo">Financial Control</a>
                            <button class="mobilebtn" @click="toggleMenu()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="27" viewbox="0 0 30 27">
                                    <g fill="none" fill-rule="evenodd">
                                        <g fill="#0077b6" style="fill: #0077b6">
                                            <g>
                                                <path d="M0 17H30V19H0zM0 25H30V27H0z"
                                                    transform="translate(-1376 -48) translate(1376 48)" />
                                                <text font-family="Poppins" sans-serif font-size="10" font-weight="500"
                                                    letter-spacing=".2"
                                                    transform="translate(-1376 -48) translate(1376 48)">
                                                    <tspan x=".115" y="10">MENU</tspan>
                                                </text>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                            <div class="menu-area" :class="{ show: mobileMenu }">
                                <ul class="marginauto">
                                    <li> <NuxtLink to="/">Home</NuxtLink> </li>

                                    <li> <NuxtLink to="/auth/Login"><button>Login</button></NuxtLink> </li>
                                    <li> <NuxtLink to="/auth/Register"><button>Register</button></NuxtLink> </li>
                                    <li> <NuxtLink to="/auth/Login"><button @click="authStoreInstance.userLogout()">Logout</button></NuxtLink> </li>

                                    <li> <NuxtLink to="/Dashboard">Dashboard</NuxtLink> </li>
                                    <li> <NuxtLink to="/TransactionsView">Transactions</NuxtLink> </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>

    </div>
</template>

<style scoped>
ul,
li {
  margin: 0;
  padding: 0;
  padding-inline-start: 0;
}
a {
  text-decoration: none;
}
.header-area {
  padding: 10px 0;
  background: #f5f5f5;
}
.logo {
  width: 300px;
  font-size: 30px;
  font-weight: 600;
}
.navigation {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.menu-area {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-preferred-size: auto;
  flex-basis: auto;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  position: relative;
}
.marginauto {
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: end;
}
.menu-area > ul {
  width: 100%;
}

.menu-area li {
  display: inline-block;
}
.menu-area li a {
  display: inline-block;
  padding: 10px 15px;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 500;
  color: #000;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.menu-area li button {
  display: inline-block;
  padding: 10px 15px;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 500;
  color: #000;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.subIocn {
  position: relative;
  display: inline-block;
}
.subIocn::before {
  position: absolute;
  display: block;
  content: "";
  left: -12px;
  top: -10px;
  width: 6px;
  height: 6px;
  border: solid #000;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.sub li {
  display: block;
}
.sub li a {
  display: block;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  padding: 8px 15px;
}
.sub li a:hover {
  background: #f5f5f5;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.sub {
  display: none;
  -webkit-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  position: absolute;
  top: 100%;
  width: 100%;
  min-width: 10rem;
  max-width: 12rem;
  background: #fff;
  border-radius: 6px;
  -webkit-box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.mega {
  display: none;
  -webkit-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  position: absolute;
  top: 100%;
  width: auto;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 90%;
  background: #fff;
  border-radius: 6px;
  -webkit-box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.menu-area li:hover .sub {
  display: block;
  -webkit-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}
.menu-area li:hover .mega {
  display: block;
  -webkit-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}

.mega-menu {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 15px;
}
.mega li {
  display: block;
}
.mega-item {
  width: 25%;
}

.mega-item h3 {
  font-size: 18px;
  line-height: 1.3;
  font-weight: 600;
}

.mega-menu li {
  display: block;
}
.mega-menu li a {
  display: inline-block;
  padding: 8px 0;
}

.mobilebtn {
  display: none;
}

@media (max-width: 1199.98px) {
  .logo {
    width: auto;
    font-size: 20px;
    font-weight: 600;
  }
  .mobilebtn {
    display: block;
  }
  .menu-area {
    display: none;
    -webkit-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
  }
  .menu-area.show {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
    -webkit-box-flex: 100% !important;
    -ms-flex-positive: 100% !important;
    flex-grow: 100% !important;
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .marginauto {
    display: block;
  }
  .menu-area li {
    display: block;
    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    position: relative;
  }
  .sub,
  .mega {
    position: static;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    display: none !important;
  }

  .sub.active {
    display: block !important;
    -webkit-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
  }
  .mega.active {
    display: block !important;
    -webkit-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
  }
  .menu-area li a {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 10px 0;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 500;
    color: #000;
    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    position: relative;
    border-top: 1px solid #ccc;
  }
  .menu-area li:first-child a {
    border-top: 1px solid transparent;
  }
  .sub li a {
    padding: 8px 15px !important;
  }
  .mega-menu li a {
    padding: 8px 0 !important;
  }
  .subIocn {
    position: absolute;
    top: 6px;
    right: 4px;
    z-index: 9;
    display: inline-block;
    border: 1px solid #ccc;
    padding: 5px;
    height: 22px;
    width: 22px;
  }
  .subIocn::before {
    left: 0;
    right: 0;
    top: 9px;
    margin: 1px auto;
    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }
  .subIocn.active::before {
    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
    top: 9px;
    -webkit-transform: rotate(225deg);
    -ms-transform: rotate(225deg);
    transform: rotate(225deg);
  }

  .mega-item {
    width: 33.33%;
  }
}

@media (max-width: 991.98px) {
  .mega-item {
    width: 50%;
  }
  .mega {
    height: 300px;
    overflow-y: scroll;
  }
}

@media (max-width: 767.98px) {
  .mega-item {
    width: 100%;
  }
}
</style>