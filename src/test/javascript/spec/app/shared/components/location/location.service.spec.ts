import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocationService } from 'app/shared/components/location/location.service';
import { City, ICity } from 'app/shared/model/city.model';

describe('Service Tests', () => {
  describe('Location Service', () => {
    let injector: TestBed;
    let service: LocationService;
    let httpMock: HttpTestingController;
    let elemDefault: ICity;
    let expectedResult: ICity | ICity[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = TestBed.inject(LocationService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = new City('ID', 'AAAAAAA', 'AA');
    });

    describe('Service methods', () => {
      it('should emit an event', done => {
        expectedResult = elemDefault;

        service.cityChange.subscribe((city: ICity) => {
          expect(expectedResult).toMatchObject(city);
          done();
        });

        service.changeCity(elemDefault);

        expect(expectedResult).toMatchObject(service.city!);
      });
    });
  });
});
