from django.db import models
import uuid


def upload_to(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"pictures/{instance.emp_id}.{ext}"
    return filename

class Employee(models.Model):
    emp_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    phone = models.CharField(max_length=200)
    salary = models.IntegerField()
    position = models.CharField(max_length=200, default='Employee')
    picture = models.ImageField(default='pictures/default.png', upload_to=upload_to, blank=True, null=True)

    def __str__(self):
        return self.name