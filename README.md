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
<img width="958" height="907" alt="appli" src="https://github.com/user-attachments/assets/1371d780-7758-430c-ab38-fc4d9801e46b" />


### dodawanie serii
<img width="490" height="495" alt="dodawanie" src="https://github.com/user-attachments/assets/23b3b4f0-88f3-4f85-85af-b9062b1b0ad6" />


### Możesz dodać wiele nazw, dzięki czemu jak będziesz wyszukiwać serię to możesz wpisać drugą nazwę w wyszukiwarce
<img width="603" height="272" alt="search" src="https://github.com/user-attachments/assets/96288e1f-cbb0-47e5-85a3-f615f2ce284f" />

### Edytowanie
<img width="632" height="594" alt="edit1" src="https://github.com/user-attachments/assets/cba69489-52d7-4f42-9c4d-8f301219be21" />


### Ekrany mobilne
<img width="306" height="655" alt="mobile" src="https://github.com/user-attachments/assets/ecea87e4-636d-4a6b-a014-ce0c730e831f" />



### Własne tagi
<img width="319" height="153" alt="tags" src="https://github.com/user-attachments/assets/743a1bab-4064-4a7f-97de-acb7fa673d87" />


## Uruchamianie
Upewnij się, że masz zainstalowanego Node.js<br>
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
6. Uruchom w przeglądarce wskazany po uruchomieniu link<br><br>

Dodatkowe komendy:<br>
<code>git pull</code> - pobieranie najnowszych zmian

