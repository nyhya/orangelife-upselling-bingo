<template>
  <div class="wrap">
    <div class="title" v-if="bingoPage">
      <span class="greenblue fbold" style="font-size: 4.5rem">생활습관</span
      >으로 알아보는
      <span class="fbold orange" style="font-size: 4.5rem">건강 빙고</span>
    </div>
    <div class="title" style="font-size: 4.2rem" v-if="resultPage">
      나의
      <span class="fbold greenblue" style="font-size: 4.5rem">생활습관</span>과
      <span class="fbold orange" style="font-size: 4.5rem">필요보장</span>은?
    </div>
    <div class="contents">
      <div class="puzzle-wrap">
        <div class="explan-txt noApp" v-if="bingoPage">
          ◎ 나에게 해당되는 문항들을 선택해보세요
        </div>
        <div class="reply-btn noApp" v-if="resultPage" @click="replayBingo">
          돌아가기
        </div>
        <!-- 퍼즐컨테이너 -->
        <div class="puzzle-box">
          <div class="empty-con">
            <div
              class="row"
              v-for="(row, rowIndex) in bingoList"
              :key="`bingo-row-${rowIndex}`"
            >
              <div
                class="piece noApp"
                v-for="(item, itemIndex) in row"
                :key="`bingo-item-${itemIndex}`"
                :id="`td-${rowIndex}-${itemIndex}`"
                @click="clickItem(rowIndex, itemIndex)"
                v-html="item"
              ></div>
            </div>
          </div>
        </div>
        <!-- 퍼즐컨테이너 -->
      </div>
      <div class="explan-wrap">
        <div class="empty-con">
          <!-- 첫번째 페이지  -시작 -->
          <div class="illust01" v-if="bingoPage"></div>
          <div class="rect-con" v-if="bingoPage">
            <div class="info-box">
              <div class="empty-con">
                <div class="sub-txt">고객님이 선택한 문항은</div>
                <div class="info-txt">
                  <div>총</div>
                  <div class="box">{{ selectItem }}</div>
                  <div>개</div>
                  <div style="font-weight: 100">입니다.</div>
                </div>
              </div>
            </div>
            <div class="result-btn noApp" @click="showResult">
              <div class="empty-con">
                <div class="sub-txt">
                  <span style="font-weight: 400">나에게 필요한 보장</span>은?
                </div>
                <span class="result-txt">결과보기</span>
              </div>
            </div>
          </div>
          <!-- 첫번째 페이지  - 끝 -->
          <div class="result-page" v-if="resultPage">
            <div class="result-round-box">
              <div class="select-num">
                <div class="num">{{ selectItem }}</div>
                <div class="txt">
                  <span class="fbold">개</span>의 문항을 선택하셨으며,
                </div>
              </div>
              <div class="bingo-num">
                <div class="num">{{ bingo }}</div>
                <div class="txt">줄이 완성되었습니다!</div>
              </div>
            </div>
            <!-- 구간 1 시작  -->
            <div class="text-area">
              <div class="sub-txt">
                <div
                  v-for="item in bottomSectionArr"
                  v-bind:key="item"
                  v-html="item"
                ></div>
              </div>
              <div class="middle-line"></div>
              <div class="result-explan">
                <div
                  class="txt-line"
                  v-for="item in sectionArr"
                  v-bind:key="item"
                >
                  <div class="ico"></div>
                  <div class="txt-explan" v-html="item"></div>
                </div>
              </div>
            </div>
            <!-- 구간 1 끝  -->
            <div class="result-box">
              <div class="recommend-product">
                <div class="txt fbold">고객님에게 추천하는 추가보장은?</div>
              </div>
              <div class="result-txt">
                <div class="disease disease01">
                  <div class="ico-txt" :class="{ on: disease01 }">암</div>
                </div>
                <div class="disease disease02">
                  <div class="ico-txt" :class="{ on: disease02 }">질병</div>
                </div>
                <div class="disease disease03">
                  <div class="ico-txt" :class="{ on: disease03 }">치매</div>
                </div>
              </div>
              <div class="empty-box"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},

  data() {
    return {
      active: false,
      resultPage: false,
      bingoPage: true,
      disease01: false,
      disease02: false,
      disease03: false,
      nextPage: false,
      bingo: 0,
      selectItem: 0,
      sectionArr: [],
      recommendInsurance: [],
      bottomSectionArr: [],
      bingoList: [
        [
          "암<br> 가족력이 <br> 있다",
          "수육보다<br>훈제가<br>좋다",
          "야채,과일을<br>챙겨 먹지<br>못한다",
          "혈압이나 당뇨가<br>있다",
          "음식을<br> 빨리<br> 먹는다",
        ],
        [
          "65세 <br>이상이다",
          "가끔<br>과음한다",
          "혼자 있는<br>시간이<br>많다",
          "주변에<br> 흡연자가<br>있다",
          "예민한<br>성격이다",
        ],
        [
          "과체중이다<br> <span style='font-size:1.8rem; font-weight:400; line-height:2rem'>(BMI 23 이상)</span>",
          "운동을<br>따로 하지<br>않는다",
          "흡연자다",
          "주로<br>앉아<br>있는다",
          "콜레스테롤<br>수치가<br>높다",
        ],
        [
          "걷기보단<br>차량을<br>이용한다",
          "햄 등<br>가공육류를<br>즐긴다",
          "만성질환을<br>보유한 적이<br>있다",
          "스트레스는<br>쌓아 둔다",
          "매운<br>음식을<br> 좋아한다",
        ],
        [
          "술 마실 땐<br>2잔 이상이<br>기본이다",
          "달콤한<br>간식을<br>좋아한다",
          "아침식사는<br>거르는<br>편이다",
          "탄산음료를<br> 즐겨 마신다",
          "건강검진을<br>가끔<br>잊는다",
        ],
      ],
      selectBingo: [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
      ],
      selectStar: [[], [], [], [], []],
      resultDiseaseTxt: [
        {
          txt: "암 발병 위험에 각별한 주의가 필요합니다.",
        },
        {
          txt: "심장 뇌혈관질환에 대한 각별한 주의가 필요합니다.",
        },
        { txt: "세상에서 가장 슬픈 병 치매,  치매예방이 필요합니다." },
        {
          txt:
            "과거 병력이나 혹은 나이 때문에 보험가입을 <br>망설이셨다면 오렌지라이프의 간편심사<br>(간편가입) 상품을 알아보세요!",
        },
      ],

      resultAdvice: [
        {
          advice:
            "건강에 좋지 않은 습관들을 갖고 계세요. <br>오늘부터 꾸준한 운동과 올바른 생활습관으로 <br>건강관리 시작! 더불어 3대 사망원인(암, 뇌혈관질환, 심혈관질환) 질병과 치매, 장기요양에 대한 대비도 준비해보세요!",
        },
        {
          advice:
            "늦지 않았어요!  꾸준한 운동과 올바른 생활습관으로 건강을 챙겨보세요!<br>더불어 사망위험이 높은 질병에 대한 대비도 차근차근 준비하시는 것 어떨까요?<br>",
        },
        {
          advice:
            "100세 시대! 건강한 생활습관 점검 및 유지와 함께 든든한 보장설계를 추천드려요!",
        },
        {
          advice:
            "건강에 좋지 않은 습관들이 있으시네요. <br> 꾸준한 운동과 올바른 생활습관으로 건강을 챙기셔야 합니다. <br>더불어 든든한 보장도 미리미리 준비하세요!",
        },
      ],

      healthGuide: [
        {
          txt:
            "<sapn style=' font-size:1.6rem; line-height:2.1rem; font-weight:600;'> 건강한 생활습관 가이드 </sapn><br>· 적정 체중과 적정 체지방량을 유지한다.<br>· 전곡류와 콩류를 많이 먹는다.<br>· 여러가지 채소와 과일을 먹는다.<br>· 붉은색 육류를 적게 먹는다.<br>· 염분을 줄이고 싱겁게 먹는다.<br>· 저지방 우유를 매일 한 컵 마신다.",
        },
      ],
    };
  },
  created() {},
  methods: {
    clickItem(rowIndex, itemIndex) {
      if (this.nextPage) {
        console.log("누르지마!");
        return;
      }
      //두번 누르면 아이템 -1 인덱스 들어옴
      var addValue = 5 * rowIndex + itemIndex; // 누른 아이템 인덱스
      var index = this.selectBingo[rowIndex][itemIndex]; //빙고 배열에서 숫자를 가져옴 : 누른 아이템 인덱스

      if (index == -1) {
        this.onAddSelectTd(rowIndex, itemIndex);
        this.$set(this.selectBingo[rowIndex], itemIndex, addValue);
        //눌러진 아이템 다시 누르면 원래 넘버로 채우기

        if (
          (rowIndex == 0 && itemIndex == 4) ||
          (rowIndex == 2 && itemIndex == 3) ||
          (rowIndex == 4 && itemIndex == 2)
        ) {
          this.$set(this.selectStar[rowIndex], itemIndex);
        }
        return;
      }
      this.onAddSelectTd(rowIndex, itemIndex);
      this.$set(this.selectBingo[rowIndex], itemIndex, -1);
      // 클릭하면 addClass 해주고 넘버링 -1 빙고배열에 넣어 줌

      if (
        (rowIndex == 0 && itemIndex == 4) ||
        (rowIndex == 2 && itemIndex == 3) ||
        (rowIndex == 4 && itemIndex == 2)
      ) {
        this.$set(this.selectStar[rowIndex], itemIndex, true);
      }

      this.selectedItemNum();
    },

    selectedItemNum() {
      this.selectItem = 0;
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (this.selectBingo[i][j] == -1) {
            this.selectItem += 1;
          }
        }
      }
    },
    onAddSelectTd(rowIndex, itemIndex) {
      this.$nextTick(() => {
        document
          .getElementById(`td-${rowIndex}-${itemIndex}`)
          .classList.toggle("on");
      });
    },
    showResult() {
      // 결과보기 버튼
      this.bingo = 0;
      this.bingoPage = !this.bingoPage;
      this.resultPage = !this.resultPage;
      this.checkHorizontal(); //FGHIJ, KLMNO
      this.checkVertical(); //BGLQV
      this.checkDiagonalLeft(); //AGMSY
      this.checkDiagonalRight(); //EIMQU
      this.section03Txt();
      this.checkInsurance(); // F or R or D
      this.noChecked();
      this.nextPage = true;
    },

    checkVertical() {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (this.selectBingo[j][i] === -1) {
            if (j === 4) {
              for (let k = 0; k < 5; k++) {
                if (k == 4 && i == 1) {
                  //세로줄 BGLQV
                  this.sectionIconAdd("health");
                  if (
                    !this.sectionArr.includes(
                      "심장 뇌혈관질환에 대한 각별한 주의가 필요합니다."
                    )
                  ) {
                    this.sectionArr.push(this.resultDiseaseTxt[1].txt);
                  }
                }
                document.getElementById(`td-${k}-${i}`).classList.add("bingo");
              }
              this.bingo++;
            }
          } else {
            break;
          }
        }
      }
    },
    checkHorizontal() {
      for (let i = 0; i < 5; i++) {
        if (
          this.selectBingo[i].every((x) => {
            return x === -1;
          })
        ) {
          for (let j = 0; j < 5; j++) {
            document.getElementById(`td-${i}-${j}`).classList.add("bingo");
            if (i == 1 && j == 4) {
              // FGHIJ 치매
              this.sectionArr.push(this.resultDiseaseTxt[2].txt);
              this.sectionIconAdd("alzheimer");
            } else if (i == 2 && j == 4) {
              // KLMNO 건강
              this.sectionArr.push(this.resultDiseaseTxt[1].txt);
              this.sectionIconAdd("health");
            }
          }
          this.bingo++;
        }
      }
    },
    checkDiagonalLeft() {
      var check = true;
      for (let i = 0; i < 5; i++) {
        if (this.selectBingo[i][i] !== -1) {
          check = false;
        }
      }
      if (check === true) {
        for (let i = 0; i < 5; i++) {
          if (this.selectBingo[i][i] == -1) {
            document.getElementById(`td-${i}-${i}`).classList.add("bingo");
          }
        }
        this.sectionArr.push(this.resultDiseaseTxt[0].txt);
        this.bingo++;
      }
      this.sectionIconAdd("cancer");
    },

    checkDiagonalRight() {
      var check = true;
      check = true;
      for (let i = 0; i < 5; i++) {
        if (this.selectBingo[i][4 - i] !== -1) {
          check = false;
        }
      }
      if (check === true) {
        for (let i = 0; i < 5; i++) {
          document.getElementById(`td-${i}-${4 - i}`).classList.add("bingo");
        }
        if (
          !this.sectionArr.includes("암 발병 위험에 각별한 주의가 필요합니다.")
        ) {
          this.sectionArr.push(this.resultDiseaseTxt[0].txt);
        }

        this.bingo++;
      }
      this.sectionIconAdd("cancer");
    },

    section03Txt() {
      if (this.bingo > 3) {
        // 4줄 이상
        this.bottomSectionArr.push(this.resultAdvice[0].advice);
        this.sectionIconAdd("cancer/health/alzheimer");
      } else if (this.bingo > 0 && this.bingo < 4) {
        // 1~3줄
        this.bottomSectionArr.push(this.resultAdvice[1].advice);
        this.sectionIconAdd("cancer/health");
      } else if (this.bingo == 0 && this.selectItem >= 6) {
        console.log(this.resultAdvice[2].advice);
        // 완성빙고 없음, 선택항목수 6개 이상
        this.bottomSectionArr.push(this.resultAdvice[3].advice);
        this.sectionIconAdd("cancer/health");
      } else if (this.selectItem < 6 && this.bingo == 0) {
        // 완성빙고 없음, 선택항목수 6개 미만

        this.bottomSectionArr.push(this.resultAdvice[2].advice);
        this.sectionIconAdd("cancer");
      }
    },

    checkInsurance() {
      // F or R or D
      if (this.selectBingo[1][0] == -1) {
        this.sectionArr.push(this.resultDiseaseTxt[3].txt);
        this.sectionIconAdd("health/alzheimer");
      }

      if (this.selectBingo[3][2] == -1) {
        if (!this.sectionArr.includes(this.resultDiseaseTxt[3].txt))
          this.sectionArr.push(this.resultDiseaseTxt[3].txt);
        this.sectionIconAdd("health/alzheimer");
      }

      if (this.selectBingo[0][3] == -1) {
        if (!this.sectionArr.includes(this.resultDiseaseTxt[3].txt))
          this.sectionArr.push(this.resultDiseaseTxt[3].txt);
        this.sectionIconAdd("health/alzheimer");
      }
    },

    noChecked() {
      if (this.sectionArr.length == 0) {
        this.sectionArr.push(this.healthGuide[0].txt);
      }
    },
    sectionIconAdd(desease) {
      switch (desease) {
        case "cancer":
          this.disease01 = true;
          break;
        case "health":
          this.disease02 = true;
          break;
        case "alzheimer":
          this.disease03 = true;
          break;
        case "cancer/health/alzheimer":
          this.disease01 = true;
          this.disease02 = true;
          this.disease03 = true;
          break;
        case "cancer/health":
          this.disease01 = true;
          this.disease02 = true;
          break;
        case "health/alzheimer":
          this.disease02 = true;
          this.disease03 = true;
          break;
      }
    },

    replayBingo() {
      this.resultPage = !this.resultPage;
      this.bingoPage = !this.bingoPage;
      this.active = false;
      this.resultPage = false;
      this.bingoPage = true;
      this.disease01 = false;
      this.disease02 = false;
      this.disease03 = false;
      this.nextPage = false;
      this.bingo = 0;
      this.selectItem = 0;
      this.sectionArr = [];
      this.recommendInsurance = [];
      this.bottomSectionArr = [];

      for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
          document.getElementById(`td-${i}-${j}`).classList.remove("bingo");
          document.getElementById(`td-${i}-${j}`).classList.remove("on");

          if (i == 0) {
            this.selectBingo[i][j] = j;
          } else if (i == 1) {
            this.selectBingo[i][j] = j + 5;
          } else if (i == 2) {
            this.selectBingo[i][j] = j + 10;
          } else if (i == 3) {
            this.selectBingo[i][j] = j + 15;
          } else if (i == 4) {
            this.selectBingo[i][j] = j + 20;
          }
        }
      }
    },
  },
};
</script>
<style scoped>
</style>
