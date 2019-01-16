<template>
  <div id="app">
    <div class="wrapper">
      <div class="header">
        <div class="header-container">
          <div class="container">
            <div class="header-logo">
              <a class="header-logo-link" href="/">
                <img class="header-logo-img" src="./assets/logo-dark.png" alt="">
              </a>
            </div>
            <div class="block-search">
              <div class="col-9">
                <input type="text" class="block-search-input" placeholder="Search block hash, index or transaction hash" v-model="searchQuery">
              </div>
              <div class="col-3">
                <button type="button" class="btn btn-search block-search-btn" @click="search">Find</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="container mt-20">
          <router-view :key="$route.fullPath"/>
        </div>
      </div>
      <div class="footer">
        <div class="footer-container">
          <div>&copy; 2018 Temtum&trade;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  created()
  {

  },
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    search: function () {
      if (this.searchQuery) {
        this.$http.post('search', { query: this.searchQuery })
          .then((resp) => {
            if (typeof resp.data === 'object') {
              if (resp.data.hash) {
                this.$router.push({ name: 'Block', params: { id: resp.data.hash }})
              } else {
                this.$router.push({ name: 'Transaction', params: { id: resp.data.id }})
              }
            } else {
              this.$router.push({ name: 'PageNotFound' })
            }
          })
      }
    }
  }
}
</script>

<style lang="scss">
  // Grid
  $columns: 12;
  $min-columns: 1;
  $gutter: 2%;
  $screen-md: 992px;
  $unit: (100% / $columns);
  $push: 0 !default;
  $mobile-columns : $columns/2;

  @mixin generate-margin-top-helpers($i, $class:"") {
    @if $i >= 0 {
      @include generate-margin-top-helpers(($i - 5), $class);
      @if $class != "" {
        .mt-#{$i}-#{$class} {
          margin-top: #{$i}px !important;
        }
      } @else {
        .mt-#{$i} {
          margin-top: #{$i}px !important;
        }
      }
    }
  }

  body,
  html {
    width: 100%;
    height: 100%;
  }
  #app {
    height: 100%;
  }
  body {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: left;
    background-color: #fff;
  }

  @include generate-margin-top-helpers(150);

  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .content {
    flex: 1 0 auto;
    display: flex;
  }
  .header {
    width: 100%;
    flex: 0 0 auto;
    overflow: auto;
    background-color: #003;
  }
  .header-logo {
    margin: 15px 0 50px 0;
  }
  .header-logo-link {
    font-size: 1.8em;
    color: black;
    text-decoration: none;
    display: flex;
    align-items: center;
    width: 130px;
  }
  .header-logo-img {
    width: 130px;
    margin-right: 20px;
  }
  .block-search {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
    -ms-flex-align: center;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 40px;
  }
  .block-search-input {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
  }
  .block-search-btn {
    width: 100%;
  }
  .footer {
    flex: 0 0 auto;
    width: 100%;
    background-color: #003;
    color: #cecece;
    font-size: 0.9em;
    margin-top: 25px;
    padding: 20px 0;
  }
  .footer-container {
    display: flex;
    justify-content: flex-end;

    div {
      width: 95%;
    }
  }
  .break-word {
    word-wrap: break-word;
  }
  button, input, optgroup, select, textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  a {
    color: #06f;
    text-decoration: none;
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
  }
  .text-center {
    text-align: center;
  }
  .btn {
    text-transform: capitalize;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    font-size: 1.5rem;
    line-height: 1.5;
    border-radius: 4px;
    transition: .5s;
    border: 1px solid #06f;
    padding: 0 1.875rem;
  }
  .btn:focus {
    color: #fff;
    border-color: #06f;
  }
  .btn-primary {
    color: #fff;
    background-color: #06f;
  }
  .btn-search {
    color: #000;
    background-color: #ffd533;
    border: none;

    &:hover {
      color: #000;
      transform: translateY(-4px);
      border: none;
    }

    &:focus {
      color: #000;
    }
  }
  .btn-primary:hover {
    color: #fff;
    transform: translateY(-4px);
    border: none;
  }
  .btn-primary:hover {
    color: #fff;
    transform: translateY(-4px);
    border: none;
  }
  .form-row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -5px;
    margin-left: -5px;
  }
  .form-row * {
    box-sizing: border-box;
  }
  .form-row > [class*=col-] {
    padding-right: 5px;
    padding-left: 5px;
  }

  @mixin grid($col) {
    margin-right: $gutter;
    width: (($unit * $col) - $gutter ) + ( $gutter / ( $columns / $col) );
    &:last-child {
      margin-right: 0;
    }
  }

  @for $i from $min-columns through $columns {
    .col-#{$i} {
      @include grid($i);
      @if $i == 12 {
        margin-right: 0;
      }
    }
  }


  .r-table {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    box-shadow: 0 0 40px rgba(0,0,0,0.2);
    &-wrapper {
      width: 100%;
    }
    &-row {
      width: 100%;
      display: flex;
    }
    &-cell {
      box-sizing: border-box;
      flex-grow: 1;
      padding: 0.8em 1.2em;
      overflow: hidden; // Or flex might break
      list-style: none;
      border-bottom: 1px solid #E1E1E1;
      &-60 {
        width: 60%;
      }
      &-50 {
        width: 50%;
      }
      &-35 {
        width: 35%;
      }
      &-30 {
        width: 30%;
      }
      &-20 {
        width: 20%;
      }
      &-15 {
        width: 15%;
      }
      &-10 {
        width: 10%;
      }
      &.column-heading {
        color: black;
        font-weight: 700;
      }
      &--heading {
        display: none;
      }
      &--content {
        overflow: hidden;
      }
      .hash-link {
        text-overflow: ellipsis;
        overflow: hidden;
        display: block;
      }
    }
  }

  .details-table {
    display: block;
    width: 100%;
    box-shadow: none;

    .r-table-row {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 2em;
      box-shadow: 0 0 40px rgba(0,0,0,0.2);

      .r-table-cell {
        width: 100% !important;
        display: flex;
        align-items: center;

        .r-table-cell--heading {
          display: inline-block;
          flex: 1;
          max-width: 120px;
          min-width: 120px;
          color: black;
          font-weight: 700;
          border-right: 1px solid #ccc;
          margin-right: 1em;
        }

        .r-table-cell--content {
          flex: 2;
          padding-left: 1em;
        }
      }
    }

    .topic-cell {
      background-color: black;
      color: white;
      order: -1;

      .r-table-cell--content {
        padding-left: 0 !important;
      }
    }

    .r-table-row--head {
      display: none;
    }
  }

  /* Responsive
  ==================================== */
  @media all and (max-width: 890px) {
    .is-striped {
      background-color: white;
    }

    .r-table--collapse  {
      display: block;
      width: 100%;
      box-shadow: none;

      .r-table-row {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 2em;
        box-shadow: 0 0 40px rgba(0,0,0,0.2);

        .r-table-cell {
          width: 100% !important;
          display: flex;
          align-items: center;

          .r-table-cell--heading {
            display: inline-block;
            flex: 1;
            max-width: 120px;
            min-width: 120px;
            color: black;
            font-weight: 700;
            border-right: 1px solid #ccc;
            margin-right: 1em;
          }

          .r-table-cell--content {
            flex: 2;
            padding-left: 1em;
            text-align: left;
          }
        }
      }

      .topic-cell {
        background-color: black;
        color: white;
        order: -1;

        .r-table-cell--content {
          padding-left: 0 !important;
        }
      }

      .r-table-row--head {
        display: none;
      }
    }
  }

  .text-overflow-ellispis {
    text-overflow: ellipsis;
  }

  // Non-Flex modernizer fallback
  .no-flexbox .r-table {
    display: block;

    &.r-table-cell {
      width: 100%;
    }
  }
</style>
