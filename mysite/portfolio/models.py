from django.db import models

class Portfolio(models.Model):
    ticker = models.CharField(max_length=10, default='???')
    name = models.CharField(max_length=25)
    amount = models.FloatField()
    platform = models.ForeignKey('Platform', related_name='portfolio_pf', on_delete=models.CASCADE, null=True, blank=True)
    owner = models.ForeignKey('auth.User', related_name='portfolio', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Platform(models.Model):
    name = models.CharField(max_length=25, default='Trading Platform', unique=True)
    based = models.CharField(max_length=25, null=True, blank=True)

    def __str__(self):
        return self.name
