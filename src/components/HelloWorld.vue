<template>
  <div class="hello">
    <el-button class="b1" @click="handleClick"> {{fileName}} </el-button>
    <!-- <el-button @click="handleClick2"> button2 </el-button> -->
  </div>
</template>

<script>
import { createClient } from "@remixproject/plugin-iframe";
import test from "@/setups/test";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      p_fn: "",
      p_data: null,
    };
  },
  setup() {
    const { contracts, setContracts, fileName, setFileName } = test();
    return {
      contracts,
      setContracts,
      fileName,
      setFileName,
    };
  },
  methods: {
    async init() {
      const temp = createClient();
      await temp.onload();
      const that = this;

      temp.solidity.on(
        "compilationFinished",
        (fn, source, languageVersion, data) => {
          // console.log(fn, source, languageVersion, data);
          that.p_fn = fn;
          that.p_data = data;
          that.setContracts({ fileName: fn, data: data.contracts[fn] });
          // eslint-disable-next-line
          // select(
          //   Object.keys(data.contracts[fn]).length > 0
          //     ? Object.keys(data.contracts[fn])[0]
          //     : "",
          //   data.contracts[fn]
          // );
        }
      );

      temp.on("fileManager", "currentFileChanged", (fn) => {
        that.setFileName(fn);
      });
      try {
        console.log("temp.fileManager.getCurrentFile()");
        console.log(temp.fileManager.getCurrentFile());
        await temp.fileManager.getCurrentFile().then((result) => {
          console.log(result);
          that.setFileName(result);
        });
        console.log(this.fileName);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    },
    async handleClick() {
      console.log(this.p_fn);
      console.log(this.p_data);
      console.log(this.fileName);
      console.log(this.contracts.fileName);
      console.log(this.contracts.data);
    },
    handleClick2() {
      console.log(this.contracts.fileName);
      console.log(this.contracts.data);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.b1{
  width: 90%;
}
</style>
