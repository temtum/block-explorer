<template>
  <div class="main-wrapper">
    <div class="content-wrapper">
      <div class="r-table-wrapper">
        <div class="r-table r-table--collapse">
          <div class="r-table-row r-table-row--head">
            <div class="r-table-cell r-table-cell-10 column-heading">Block #</div>
            <div class="r-table-cell r-table-cell-50 column-heading">Hash</div>
            <div class="r-table-cell r-table-cell-20 column-heading text-center">Transaction</div>
            <div class="r-table-cell r-table-cell-20 column-heading text-center">Timestamp</div>
          </div>

          <div class="r-table-row" v-for="block in blocks">
            <div class="r-table-cell r-table-cell-10">
              <div class="r-table-cell--heading">Block #</div>
              <div class="r-table-cell--content">{{ block.index }}</div>
            </div>
            <div class="r-table-cell r-table-cell-50">
              <div class="r-table-cell--heading">Hash</div>
              <div class="r-table-cell--content"><router-link :to="{ name: 'Block', params: { id: block.hash }}" class="hash-link">{{ block.hash }}</router-link></div>
            </div>
            <div class="r-table-cell r-table-cell-20">
              <div class="r-table-cell--heading">Transactions</div>
              <div class="r-table-cell--content text-center">{{ block.data.length }}</div>
            </div>
            <div class="r-table-cell r-table-cell-20">
              <div class="r-table-cell--heading">Timestamp</div>
              <div class="r-table-cell--content text-center">{{ block.timestamp }}</div>
            </div>
          </div>
        </div>
      </div>

      <ul class="pagination" v-if="pages">
        <li v-if="activePage > 1" class="page-item left">
          <a href="javascript:void(0)" @click="getBlocks(activePage - 1)" class="page-link">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0" y="0" viewBox="0 0 31.49 31.49" xml:space="preserve" width="15px" height="15px" style="fill: #06f;"><g><path d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111  C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587  c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z" data-original="#1E201D" data-old_color="#242423" class="active-path"></path></g></svg>
          </a>
        </li>
        <li v-if="pages > 0" class="page-item" :class="{ 'active': activePage === 1 }">
          <a href="javascript:void(0)" @click="activePage === 1 ? null : getBlocks(1)" class="page-link">1</a>
        </li>
        <li v-if="pages > 5 && activePage > 3" class="page-item dots">
          <a href="javascript:void(0)" class="page-link">...</a>
        </li>
        <li v-for="page in pages - 1" v-if="page > 1 && (page >= activePage - 2 && page < activePage + 3)" class="page-item" :class="{ 'active': activePage === page }">
          <a href="javascript:void(0)" @click="activePage === page ? null : getBlocks(page)" class="page-link">{{page}}</a>
        </li>
        <li v-if="pages > 5 && pages - activePage > 3" class="page-item dots">
          <a href="javascript:void(0)" class="page-link">...</a>
        </li>
        <li v-if="pages > 1" class="page-item" :class="{ 'active': activePage === pages }">
          <a href="javascript:void(0)" @click="activePage === pages ? null : getBlocks(pages)" class="page-link">{{pages}}</a>
        </li>
        <li v-if="pages > 5 && activePage !== pages" class="page-item right">
          <a href="javascript:void(0)" @click="getBlocks(activePage + 1)" class="page-link">
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0" y="0" viewBox="0 0 31.49 31.49" xml:space="preserve" width="15px" height="15px" style="fill: #06f;"><g><path d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111  C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587  c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z" data-original="#1E201D" data-old_color="#242423" class="active-path"></path></g></svg>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FrontPage',
    data() {
      return {
        blocks: [],
        pages: 0,
        activePage: 0
      }
    },
    created() {
      this.getBlocks();
    },
    methods: {
      getBlocks: function (page) {
        page = page ? page : 1;
        this.$http.get('blocks/' + page)
          .then((resp) => {
            this.activePage = page;
            this.blocks = resp.data.blocks;
            this.pages = resp.data.pages;
          });
      }
    }
  }
</script>


<style scoped lang="scss">
  .blocks-list {
    width: 100%;
  }
  .pagination {
    margin-top: 25px;
    margin-bottom: .5rem;
    display: -ms-flexbox;
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: .25rem;
    font-size: 1.8rem;
    justify-content: center;
  }
  .page-item {
    margin: 0 2px;
  }
  .page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: #06f;
    border-color: #06f;
  }
  .page-item.dots .page-link {
    border: none;
  }
  .page-item.left {
    transform: scaleX(-1);
  }
  .page-link {
    position: relative;
    display: block;
    padding: .65rem 1rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #06f;
    background-color: #fff;
    border: 1px solid #dee2e6;
  }
  .page-item:first-child .page-link {
    border-top-left-radius: .3rem;
    border-bottom-left-radius: .3rem;
  }
  .page-item.left:first-child .page-link {
    border-radius: 0 .3rem .3rem 0;
  }
  .page-item:last-child .page-link {
    border-top-right-radius: .3rem;
    border-bottom-right-radius: .3rem;
  }
  .hash-link-container {
    a {
      display: inline-block;
      overflow: hidden;
      width: 60%;
      text-overflow: ellipsis;
    }
  }
</style>
