import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {relativeTimeRounding} from 'admin-lte/bower_components/moment/moment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  array = [ 1, 2, 3, 4, 5];
  public data: News[] = [
   new News('\'https://www.fzu.edu.cn/\'', '福大新闻', '../../../assets/images/new1.png', '福大张梅芳教授花鸟画作品展开幕 以“生命之韵”礼赞新中国成立70周年', '新闻中心讯/7月5日上午，为迎接新中国成立70周年，由民建中央画院、福州大学、福建省美术家协会主办，民建福建省委书画院、福建民建艺术馆协办的《生命之韵》——福州大学张梅芳教授工笔花鸟画作品展在福州画院开展。福建省人大常委会原副主任、民建福建省委原主委林强，民建中央画院院长周鸣秋，民建中央办公厅副主任、民建中央画院秘书长朱旭，民建福建省委主委、省中华职教社主任吴志明先生，福建省美术家协会主席王来文先生等嘉宾和福州大学党委书记陈永正、副校长黄志刚以及来自福建省文联、民建福建省委书画院...'),
   new News('\'https://www.fzu.edu.cn/\'', '福大新闻', '../../../assets/images/new2.png', '教育部专家组对福大进行科研实验室安全现场检查', '新闻中心讯/7月5日，教育部组织专家组来福州大学开展科研实验室安全现场检查工作。专家组由上海交通大学资产管理与实验室处副处长、检查组组长彭华松，军事科学院军事医学研究院主任李劲松等5人组成。福建省教育厅科技处处长郑邦华，福州大学副校长张星，相关部处及各学院分管实验室安全负责领导、各校直科研机构（中心）负责人，实验室负责人、实验室教师代表出席了首末次会议。'),
   new News('\'https://www.fzu.edu.cn/\'', '福大新闻', '../../../assets/images/new3.png', '福州大学民建经济研究院召开参政议政工作座谈会', '新闻中心讯/7月4日下午，福州大学民建经济研究院在旗山校区召开参政议政工作座谈会。民建福建省委主委、省中华职教社主任吴志明，福建省委改革办常务副主任薛侃莅会指导，中共福州大学党委副书记林生应邀参会，民建福建省委调研处，福州大学党委统战部、经济与管理学院等相关负责人及民建经济研究院相关专家一同参会。林生副书记热烈欢迎吴志明主委和薛侃副主任一行的到来。他简要介绍了福州大学办学情况，对共建以来“福州大学民建经济研究院”的扎实作为和良好成绩给予了肯定，希望研究院继续发挥专业优势，着力培养团队，打造协同创新平台，围绕我省经济社会发展中的重点难点热点问题积极建言献策，为促进国家、地方经济建设以及学校办学发展作出更大贡献，向新中国成立70周年献礼。'),
   new News('\'https://www.fzu.edu.cn/\'', '福大新闻', '../../../assets/images/new4.png', '省公安厅国保总队在晋江校区检查校园安全工作', '新闻中心讯/为贯彻落实《福建省人民政府安委会办公室关于深入贯彻落实习近平总书记重要指示精神切实加强当前安全生产工作的通知》精神，7月3日上午，福建省公安厅国保总队在晋江校区检查校园安全工作，晋江科教园管委会负责人陪同检查。检查组听取了晋江科教园管委会负责同志关于校园安全工作的汇报，对管委会所做的工作给予充分肯定。检查组一行先后深入消控室、实验室、图书馆、设备房、礼堂、食堂、学生公寓、警务室等场所，仔细查看了各重点部位、重点环节安全管理措施落实情况，特别是对校园安全安防设施进行了全面梳理排查，并对进一步加强对校园安全工作提出建设性意见。')
  ];
  constructor() { }

  ngOnInit() {
    registerLocaleData(zh);
  }
  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onModeChange(mode: 'month'|'year'): void {
    console.log(`Current mode: ${mode}`);
  }

}

export class News {
  constructor(public href: string,
              public title: string,
              public avatar: string,
              public description: string,
              public content: string) {

  }
}
