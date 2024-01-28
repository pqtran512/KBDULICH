requirements: 
- SQL
- django packages: mysqlclient, djangorestframework, django-cors-headers, Pillow

setup SQL environment
https://www.youtube.com/watch?v=i0Ny3caKsrE&list=PLbiEmmDApLby83031AFtpTw2WUS9tvlEB&index=3
5:53-6:30

#kết nối vs CSDL: SQL
python manage.py makemigrations mydata
python manage.py migrate

#chạy server
python -m venv myenv
myenv\Scripts\activate
python manage.py runserver
