import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { IConfig } from 'ngx-countries-dropdown';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  selectedCountry: string = '';

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }


  ngOnInit(): void { }

  // Custom validator for password matching
  passwordMatchValidator(form: FormGroup): void {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    }
  }

  // Handle form submission
  async onSubmit(): Promise<void> {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
      const response = await this.authService.signup(
        this.signupForm.value.usernmame,
        this.signupForm.value.email,
        this.signupForm.value.country,
        this.signupForm.value.password
      );
      console.log("response", response);
    } else {
      console.log('Form Errors', this.signupForm.errors);
    }
  }

  /**
   * Sélection du pays
   */
  selectedCountryConfig: IConfig = {
    hideCode: true,
    hideName: false
  };

  countryListConfig: IConfig = {
    hideCode: true
  };

  onCountryChange(event: any) {
    this.selectedCountry = event.value;
  }

  getCountryName(value: string): string {
    const country = this.countries.find(c => c.code === value);
    return country ? country.name : '';
  }

  countries = [
    { code: "AF", name: "Afghanistan" },
    { code: "ZA", name: "Afrique du Sud" },
    { code: "AX", name: "Åland, îles" },
    { code: "AL", name: "Albanie" },
    { code: "DZ", name: "Algérie" },
    { code: "DE", name: "Allemagne" },
    { code: "AD", name: "Andorre" },
    { code: "AO", name: "Angola" },
    { code: "AI", name: "Anguilla" },
    { code: "AQ", name: "Antarctique" },
    { code: "AG", name: "Antigua et Barbuda" },
    { code: "SA", name: "Arabie Saoudite" },
    { code: "AR", name: "Argentine" },
    { code: "AM", name: "Arménie" },
    { code: "AW", name: "Aruba" },
    { code: "AU", name: "Australie" },
    { code: "AT", name: "Autriche" },
    { code: "AZ", name: "Azerbaïdjan" },
    { code: "BS", name: "Bahamas" },
    { code: "BH", name: "Bahreïn" },
    { code: "BD", name: "Bangladesh" },
    { code: "BB", name: "Barbade" },
    { code: "BY", name: "Bélarus" },
    { code: "BE", name: "Belgique" },
    { code: "BZ", name: "Belize" },
    { code: "BJ", name: "Bénin" },
    { code: "BM", name: "Bermudes" },
    { code: "BT", name: "Bhoutan" },
    { code: "BO", name: "Bolivie, l'État plurinational de" },
    { code: "BA", name: "Bosnie-Herzégovine" },
    { code: "BW", name: "Botswana" },
    { code: "BR", name: "Brésil" },
    { code: "BN", name: "Brunei Darussalam" },
    { code: "BG", name: "Bulgarie" },
    { code: "BF", name: "Burkina Faso" },
    { code: "BI", name: "Burundi" },
    { code: "KY", name: "Caïmans, îles" },
    { code: "KH", name: "Cambodge" },
    { code: "CM", name: "Cameroun" },
    { code: "CA", name: "Canada" },
    { code: "CV", name: "Cap-Vert" },
    { code: "CF", name: "Centrafricaine, République" },
    { code: "CL", name: "Chili" },
    { code: "CN", name: "Chine" },
    { code: "CX", name: "Christmas, île" },
    { code: "CY", name: "Chypre" },
    { code: "CC", name: "Cocos (Keeling), îles" },
    { code: "CO", name: "Colombie" },
    { code: "KM", name: "Comores" },
    { code: "CG", name: "Congo" },
    { code: "CD", name: "Congo, la République démocratique du" },
    { code: "CK", name: "Cook, îles" },
    { code: "KR", name: "Corée, République de" },
    { code: "KP", name: "Corée, République populaire démocratique de" },
    { code: "CR", name: "Costa Rica" },
    { code: "CI", name: "Côte d'Ivoire" },
    { code: "HR", name: "Croatie" },
    { code: "CU", name: "Cuba" },
    { code: "CW", name: "Curaçao" },
    { code: "DK", name: "Danemark" },
    { code: "DJ", name: "Djibouti" },
    { code: "DO", name: "Dominicaine, République" },
    { code: "DM", name: "Dominique" },
    { code: "EG", name: "Égypte" },
    { code: "SV", name: "El Salvador" },
    { code: "AE", name: "Émirats arabes unis" },
    { code: "EC", name: "Équateur" },
    { code: "ER", name: "Érythrée" },
    { code: "ES", name: "Espagne" },
    { code: "EE", name: "Estonie" },
    { code: "US", name: "États-Unis" },
    { code: "ET", name: "Éthiopie" },
    { code: "FK", name: "Falkland, îles (Malvinas)" },
    { code: "FO", name: "Féroé, îles" },
    { code: "FJ", name: "Fidji" },
    { code: "FI", name: "Finlande" },
    { code: "FR", name: "France" },
    { code: "GA", name: "Gabon" },
    { code: "GM", name: "Gambie" },
    { code: "GE", name: "Géorgie" },
    { code: "GS", name: "Géorgie du Sud et les îles Sandwich du Sud" },
    { code: "GH", name: "Ghana" },
    { code: "GI", name: "Gibraltar" },
    { code: "GR", name: "Grèce" },
    { code: "GD", name: "Grenade" },
    { code: "GL", name: "Groenland" },
    { code: "GU", name: "Guam" },
    { code: "GT", name: "Guatemala" },
    { code: "GG", name: "Guernesey" },
    { code: "GN", name: "Guinée" },
    { code: "GW", name: "Guinée-Bissau" },
    { code: "GQ", name: "Guinée équatoriale" },
    { code: "GY", name: "Guyana" },
    { code: "HT", name: "Haïti" },
    { code: "HN", name: "Honduras" },
    { code: "HK", name: "Hong Kong" },
    { code: "HU", name: "Hongrie" },
    { code: "IM", name: "Île de Man" },
    { code: "VG", name: "Îles Vierges britanniques" },
    { code: "VI", name: "Îles Vierges des États-Unis" },
    { code: "IN", name: "Inde" },
    { code: "ID", name: "Indonésie" },
    { code: "IR", name: "Iran, République islamique d'" },
    { code: "IQ", name: "Irak" },
    { code: "IE", name: "Irlande" },
    { code: "IS", name: "Islande" },
    { code: "IL", name: "Israël" },
    { code: "IT", name: "Italie" },
    { code: "JM", name: "Jamaïque" },
    { code: "JP", name: "Japon" },
    { code: "JE", name: "Jersey" },
    { code: "JO", name: "Jordanie" },
    { code: "KZ", name: "Kazakhstan" },
    { code: "KE", name: "Kenya" },
    { code: "KG", name: "Kirghizistan" },
    { code: "KI", name: "Kiribati" },
    { code: "KW", name: "Koweït" },
    { code: "LA", name: "Lao, République démocratique populaire" },
    { code: "LS", name: "Lesotho" },
    { code: "LV", name: "Lettonie" },
    { code: "LB", name: "Liban" },
    { code: "LR", name: "Libéria" },
    { code: "LY", name: "Libye" },
    { code: "LI", name: "Liechtenstein" },
    { code: "LT", name: "Lituanie" },
    { code: "LU", name: "Luxembourg" },
    { code: "MO", name: "Macao" },
    { code: "MG", name: "Madagascar" },
    { code: "MW", name: "Malawi" },
    { code: "MY", name: "Malaisie" },
    { code: "MV", name: "Maldives" },
    { code: "ML", name: "Mali" },
    { code: "MT", name: "Malte" },
    { code: "MH", name: "Marshall, îles" },
    { code: "MQ", name: "Martinique" },
    { code: "MR", name: "Mauritanie" },
    { code: "MU", name: "Maurice" },
    { code: "YT", name: "Mayotte" },
    { code: "MX", name: "Mexique" },
    { code: "FM", name: "Micronésie, États fédérés de" },
    { code: "MD", name: "Moldova, République de" },
    { code: "MC", name: "Monaco" },
    { code: "MN", name: "Mongolie" },
    { code: "ME", name: "Monténégro" },
    { code: "MS", name: "Montserrat" },
    { code: "MZ", name: "Mozambique" },
    { code: "MM", name: "Myanmar" },
    { code: "NA", name: "Namibie" },
    { code: "NR", name: "Nauru" },
    { code: "NP", name: "Népal" },
    { code: "NI", name: "Nicaragua" },
    { code: "NE", name: "Niger" },
    { code: "NG", name: "Nigéria" },
    { code: "NU", name: "Niué" },
    { code: "NF", name: "Norfolk, île" },
    { code: "NO", name: "Norvège" },
    { code: "NC", name: "Nouvelle-Calédonie" },
    { code: "NZ", name: "Nouvelle-Zélande" },
    { code: "OM", name: "Oman" },
    { code: "UG", name: "Ouganda" },
    { code: "UZ", name: "Ouzbékistan" },
    { code: "PK", name: "Pakistan" },
    { code: "PW", name: "Palaos" },
    { code: "PS", name: "Palestinien occupé, territoire" },
    { code: "PA", name: "Panama" },
    { code: "PG", name: "Papouasie Nouvelle-Guinée" },
    { code: "PY", name: "Paraguay" },
    { code: "NL", name: "Pays-Bas" },
    { code: "PE", name: "Pérou" },
    { code: "PH", name: "Philippines" },
    { code: "PN", name: "Pitcairn" },
    { code: "PL", name: "Pologne" },
    { code: "PF", name: "Polynésie française" },
    { code: "PR", name: "Porto Rico" },
    { code: "PT", name: "Portugal" },
    { code: "QA", name: "Qatar" },
    { code: "RO", name: "Roumanie" },
    { code: "GB", name: "Royaume-Uni" },
    { code: "RU", name: "Russie, fédération de" },
    { code: "RW", name: "Rwanda" },
    { code: "EH", name: "Sahara occidental" },
    { code: "BL", name: "Saint Barthélemy" },
    { code: "SH", name: "Sainte Hélène, Ascension et Tristan da Cunha" },
    { code: "LC", name: "Sainte Lucie" },
    { code: "KN", name: "Saint Kitts et Nevis" },
    { code: "SM", name: "Saint-Marin" },
    { code: "MF", name: "Saint-Martin (partie française)" },
    { code: "VA", name: "Saint-Siège (État de la Cité du Vatican)" },
    { code: "VC", name: "Saint-Vincent et les Grenadines" },
    { code: "SB", name: "Salomon, îles" },
    { code: "WS", name: "Samoa" },
    { code: "AS", name: "Samoa américaines" },
    { code: "ST", name: "Sao Tomé et Principe" },
    { code: "SN", name: "Sénégal" },
    { code: "RS", name: "Serbie" },
    { code: "SC", name: "Seychelles" },
    { code: "SL", name: "Sierra Leone" },
    { code: "SG", name: "Singapour" },
    { code: "SK", name: "Slovaquie" },
    { code: "SI", name: "Slovénie" },
    { code: "SO", name: "Somalie" },
    { code: "SD", name: "Soudan" },
    { code: "SS", name: "Soudan du Sud" },
    { code: "LK", name: "Sri Lanka" },
    { code: "SE", name: "Suède" },
    { code: "CH", name: "Suisse" },
    { code: "SR", name: "Suriname" },
    { code: "SZ", name: "Swaziland" },
    { code: "SY", name: "Syrienne, République arabe" },
    { code: "TJ", name: "Tadjikistan" },
    { code: "TW", name: "Taïwan, province de Chine" },
    { code: "TZ", name: "Tanzanie, République unie de" },
    { code: "TD", name: "Tchad" },
    { code: "CZ", name: "Tchèque, République" },
    { code: "TF", name: "Terres australes françaises" },
    { code: "TH", name: "Thaïlande" },
    { code: "TL", name: "Timor-Leste" },
    { code: "TG", name: "Togo" },
    { code: "TK", name: "Tokelau" },
    { code: "TO", name: "Tonga" },
    { code: "TT", name: "Trinité et Tobago" },
    { code: "TN", name: "Tunisie" },
    { code: "TM", name: "Turkménistan" },
    { code: "TC", name: "Turks et Caïcos, îles" },
    { code: "TR", name: "Turquie" },
    { code: "TV", name: "Tuvalu" },
    { code: "UA", name: "Ukraine" },
    { code: "UY", name: "Uruguay" },
    { code: "VU", name: "Vanuatu" },
    { code: "VE", name: "Venezuela, République bolivarienne du" },
    { code: "VN", name: "Viêt Nam" },
    { code: "WF", name: "Wallis et Futuna" },
    { code: "YE", name: "Yémen" },
    { code: "ZM", name: "Zambie" },
    { code: "ZW", name: "Zimbabwe" },
  ];


}
