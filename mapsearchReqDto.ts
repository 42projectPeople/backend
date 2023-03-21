export class mapSearchDto {
  keyword: string;
}

interface place {
  name: string; // 상호명
  address: string; // 실제 주소 (서울시 강남구 개포동 xxx)
}

export class mapSearchReturnDto {
  place1?: place; // 검색결과가 없을 수도 있음
  place2?: place;
  place3?: place;
  place4?: place;
  place5?: place;
}

export class mapDto {
  address: string;
}

export class mapReturnDto {
  address: string;
  longitude: number;
  latitude: number;
}
