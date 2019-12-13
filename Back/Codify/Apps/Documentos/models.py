from django.db import models
from django.contrib.auth.models import User
from Apps.Documentos import models as models_documentos

# Create your models here.
class Carpeta (models.Model):
    nombre = models.CharField(max_length = 80)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)

class Documento (models.Model):
    nombre = models.CharField(max_length = 80)
    lenguaje = models.CharField(max_length=1, choices=[(1, "Python"), (2, "JavaScript")])
    ruta = models.CharField(max_length=200)
    proyecto = models.ForeignKey('Carpeta', on_delete=models.CASCADE)
class Solicitudes_b(models.Model):
    ruta = models.CharField(max_length=200)
    dueno = models.ForeignKey(User, on_delete=models.CASCADE, related_name='dueno' )
    invitado = models.ForeignKey(User, on_delete=models.CASCADE, related_name='invitado')
class Accesos_b(models.Model):
    ruta = models.CharField(max_length=200)
    destinatario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='destinatario')
    solicitud = models.ForeignKey(User, on_delete=models.CASCADE, related_name='solicitud')

