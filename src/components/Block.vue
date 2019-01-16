<template>
  <div v-if="block.hash">

    <h3>Block #{{ block.index }}</h3>
    <div class="r-table-wrapper details-table">
      <div class="details-table">
        <div class="r-table-row">
          <div class="r-table-cell r-table-cell-35">
            <div class="r-table-cell--heading">Hash</div>
            <div class="r-table-cell--content text-overflow-ellispis">{{ block.hash }}</div>
          </div>
          <div class="r-table-cell r-table-cell-35">
            <div class="r-table-cell--heading">Previous hash</div>
            <div class="r-table-cell--content text-overflow-ellispis">{{ block.previousHash }}</div>
          </div>
          <div class="r-table-cell r-table-cell-20">
            <div class="r-table-cell--heading">Timestamp</div>
            <div class="r-table-cell--content">{{ block.timestamp }}</div>
          </div>
          <div class="r-table-cell r-table-cell-10">
            <div class="r-table-cell--heading">Number of transactions</div>
            <div class="r-table-cell--content">{{ block.data.length }}</div>
          </div>
        </div>
      </div>
    </div>
    <h3>Transactions</h3>
    <div class="transaction" v-for="(tx, i) in block.data" :key="i">
      <div class="row">
        <span class="label">Transaction id:</span>
        <router-link :to="{ name: 'Transaction', params: { id: tx.id }}">
          <span class="break-word">{{ tx.id }}</span>
        </router-link>
      </div>
      <div class="row">
        <div class="five columns">
          <div v-for="(txIn, inIndex) in tx.txIns" :key="inIndex">
            <div v-if="txIn.signature === ''">coinbase</div>
            <div class="break-word" v-else>
              <div v-if="txIn.address"><span class="label">Adress:</span> {{ txIn.address }}</div>
              <div v-if="txIn.amount >= 0"><span class="label">Total amount:</span> {{ txIn.amount }}</div>
              <div v-if="txIn.blockIndex"><span class="label">Block index:</span> {{ txIn.blockIndex }}</div>
              <div v-if="txIn.signature"><span class="label">Signature:</span> {{ txIn.signature }}</div>
              <div v-if="txIn.txOutId"><span class="label">txOutId:</span> {{ txIn.txOutId }}</div>
              <div><span class="label">txOutIndex:</span> {{ txIn.txOutIndex }}</div>
            </div>
          </div>
        </div>
        <div class="one columns">
          ->
        </div>
        <div class="six columns">
          <div class="row" v-for="(txOut, outIndex) in tx.txOuts" :key="outIndex">
            <div class="break-word" v-if="txOut.address">
              <span class="label">Address:</span>
              <router-link :to="{ name: 'Address', params: {address: txOut.address}}">
                <span>{{ txOut.address }}</span>
              </router-link>
            </div>
            <div><span class="label">Amount:</span> {{ txOut.amount}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Block',
    data() {
      return {
        block :{}
      }
    },
    created() {
      this.getBlock(this.$route.params.id)
    },
    methods: {
      getBlock: function (hash) {
        this.$http.get('block/' + hash)
          .then(resp => {
            this.block = resp.data;
          })
      },
      trimAddress: function(address) {
        return address.substr(0,24) + '...';
      }
    }
  }
</script>

<style scoped>
  .transaction {
    padding: 1em;
    margin-bottom: 1em;
    background-color: gainsboro;
  }
  .label {
    font-weight: 800;
  }

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

</style>
