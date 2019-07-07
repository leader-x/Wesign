import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'major'
})
export class MajorPipe implements PipeTransform {

  transform(list: any[],field:string ,keyword:string): any {
    if(!field || !keyword){
      return list;
    }
    return list.filter(item=>{
      let itemFieldValue =item[field].toLowerCase();
      return itemFieldValue.indexOf(keyword) >=0;
    });
  }

}
