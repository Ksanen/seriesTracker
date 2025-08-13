# Series Tracker

# Spis treści
- [Opis](#Opis)
- [Technologia](#Technologia)
- [Wygląd](#Wygląd)
- [Uruchamianie projektu](#Uruchamianie)

## Opis
Dzięki tej aplikaci możesz zapisywać postępy w oglądanych przez siebie filmach, seriach.
Możesz zapisywać odcinki,sezony na których skończyłeś.
Jeśli to jest film to możesz ustawić czas na którym skończyłeś oglądanie. Możesz filtrować swoje serie, zmieniać ustawienia widoku oraz w każdej chwili je edytować lub usunąć. Możesz nawet tworzyć własne tagi

## Technologia
-angular<br>
-express.js <br>
-mongodb <br>

## Wygląd
<img width="920" height="908" alt="screen" src="https://github.com/user-attachments/assets/ddadb0be-64e1-41fc-b688-49cffb936510" />

### dodawanie serii
<img width="508" height="562" alt="add" src="https://github.com/user-attachments/assets/247c16ff-0bb4-4d3c-b6eb-a156552f5359" />

### Możesz dodać wiele nazw, dzięki czemu jak będziesz wyszukiwać serię to możesz wpisać drugą nazwę w wyszukiwarce
<img width="603" height="272" alt="search" src="https://github.com/user-attachments/assets/96288e1f-cbb0-47e5-85a3-f615f2ce284f" />

### Edytowanie
<img width="594" height="611" alt="edit" src="https://github.com/user-attachments/assets/40a1a0a8-ca88-4aa8-bf16-a59d5bd7cef7" />

### Ekrany mobilne
<img width="306" height="655" alt="mobile" src="https://github.com/user-attachments/assets/ecea87e4-636d-4a6b-a014-ce0c730e831f" />



### Własne tagi
<img width="319" height="153" alt="tags" src="https://github.com/user-attachments/assets/743a1bab-4064-4a7f-97de-acb7fa673d87" />


## Uruchamianie

1. Sklonuj repozytorium <br>
<code>git clone https://github.com/Ksanen/seriesTracker.git</code>
2. wejdź w projekt<br>
<code>cd seriesTracker</code>
3. Zainstaluj paczki<br>
<code>npm run install-all</code>

4. Utwórz plik .env i dodaj zmienną z URL do bazy mongo<br>
<img width="698" height="215" alt="baza" src="https://github.com/user-attachments/assets/26b03453-648a-402b-b3f9-6d1a6817eb09" /><br>
Domyślnie serwer działa dla portu 3000<br>
jednakże, możesz dodać zmienną w .env np. PORT=3200, żeby ustawić inny port.<br>

Jeśli zdecydujesz się dodać zmienną z portem innym niż 3000 <br>
to musisz zmienić port w plikach wyświetlanych na zrzucie
<img width="1175" height="305" alt="do" src="https://github.com/user-attachments/assets/4046c002-2ad8-4684-b37a-19d3745df100" /><br>

5. Uruchom projekt<br>
<code>ng run all</code>
